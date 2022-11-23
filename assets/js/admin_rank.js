let XIcon = $(".auth-form__header i.fa-xmark"),
    cancelSongForm = $(".auth-form__controls-back"),
    target_id,
    TableBody,
    current_tablePage = 1,
    Suggestions,
    search = $(".RankPage .container__header-with-search-input");

$(document).ready(function () {
    // Add active cho sidebar
    $(".header__item:nth-child(5)").addClass("header__item--active");
    // Lấy dữ liệu bài hát
    getData();
});

XIcon.click(function () {
    $(".modal").css("display", "none");

});
cancelSongForm.click(function () {
    $(".modal").css("display", "none");
});

function getData() {
    $.get(
        "http://localhost:" + location.port + "/admin/rank-api/get-song.php",
        function (data, status) {
            TableBody = [];
            let searchValue = '',
                top = 1;
            data["data"].forEach((e) => {
                TableBody.push(
                    "<tr><td>" + top + "</td><td>"
                    + e["name"] + "</td><td>"
                    + e["singer"] + "</td><td>"
                    + e["listens"] + "</td><td>"
                    + e["downloads"] + "</td><td> " +
                    '<i class="fa-solid fa-eye" onclick="Open_Dialog_View(' + e["id"] + ", '" + e["name"] + "'" + ", '"
                    + e["singer"] + "'" + ", '" + e["date"] + "'" + ", '" + e["category"] + "'" + ", `" + e["lyric"] + "`" + ", '"
                    + e["listens"] + "'" + ", '" + e["comments"] + "'" + ", '" + e["downloads"] + "'" + ", '" + e["file"] + "')\"></i>" +
                    '</td><td style="display: none">' +
                    e["category"] +
                    '</td><td style="display: none">' +
                    e["lyric"] +
                    '</td><td style="display: none">' +
                    e["file"] +
                    "</td></tr>"
                );
                top += 1;
                searchValue += e["name"] + ",";

                e["singer"].split(",").forEach(element => {
                    if (!searchValue.includes(element)) {
                        searchValue += element + ",";
                    }
                });
            });
            let endNum = current_tablePage * 8,
                beginNum = endNum - 8,
                tableDisplay = "",
                pageAmount = Math.ceil(data["data"].length / 8),
                Table_NumHtml = "",
                active;

            for (let j = 1; j <= pageAmount; j++) {
                active = j == current_tablePage ?
                    "admin__song-pagination-link--active" : "";
                Table_NumHtml +=
                    '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`Main`)">' +
                    '<a class="admin__song-pagination-link ' +
                    active +
                    '">' +
                    j +
                    "</a></li>";
            }
            $("#Table_rank").html(Table_NumHtml); // các trang của table
            for (let i = beginNum; i < endNum; i++) {
                tableDisplay += TableBody[i];
            }
            $("#table-body").html(tableDisplay);
            // $("#Categories_value").html(categoriesValue);
            $("#Search_value").html(searchValue);
        },
        "json"
    );
}

function Open_Dialog_View(id, name, singer, date, category, lyric, listens, comments, downloads, file) {
    $("#viewRank_id").html(id);
    $("#viewRank_name").html(name);
    $("#viewRank_singer").html(singer);
    $("#viewRank_date").html(date);
    $("#viewRank_category").html(category);
    $("#viewRank_listens").html(listens);
    $("#viewRank_comments").html(comments);
    $("#viewRank_downloads").html(downloads);
    $("#viewRank_file").html(file);
    $("#viewRank_lyric").html(lyric);
    $("#myModal_ViewRank").css("display", "flex")
}
function Pagination_click(e, table) {
    table_page = $(".admin__song-pagination-list li a");
    table_page.removeClass("admin__song-pagination-link--active");
    $("a", e).addClass("admin__song-pagination-link--active");
    current_tablePage = $(e).text();
    let endNum = current_tablePage * 8,
        beginNum = endNum - 8,
        tableDisplay = "";
    if (table == "Main") {
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += TableBody[i];
        }
    } else {
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += SearchTable[i];
        }
    }

    $("#table-body").html(tableDisplay);
}

// sự kiện onchange search input
$(".RankPage .container__header-with-search-input").on("input", function (e) {
    setTimeout(function () {
        let rowSuggestions = $("#myInputautocomplete-list>div").length;
        if (search.val() != "" && rowSuggestions != 0) {
            $(".container__header-with-search-result").css("visibility", "visible");
        } else {
            $(".container__header-with-search-result").css("visibility", "hidden");
        }
    }, 20);

    SearchTable = [];
    TableBody.forEach((i) => {
        if (i.toLowerCase().indexOf(search.val().toLowerCase()) > -1) {
            SearchTable.push(i);
        }
    });
});

//search input click
$(".RankPage .container__header-with-search-input").click(function () {
    Suggestions = $("#Search_value").html().split(",");
    Suggestions.pop();
    autocomplete(document.getElementById("myInput"), Suggestions);
});
$("body").click(function (e) {
    if (e.target.className != "container__header-with-search-result" &&
        e.target.className != "container__header-with-search-input") {
        $(".container__header-with-search-result").css("visibility", "hidden");
    }
});
// nút search icon click
$(".RankPage .fa-magnifying-glass").click(function () {
    $(".NullValue").css("display", "none")
    SearchTable = [];
    TableBody.forEach((i) => {
        if (i.toLowerCase().indexOf(search.val().toLowerCase()) > -1) {
            SearchTable.push(i);
        }
    });
    searchClick();
});

// click các gợi ý trong  - 'Đề xuất cho bạn'
$("#myInputautocomplete-list").click(function () {
    search.val($(this).html());

    SearchTable = [];
    TableBody.forEach((i) => {
        if (i.toLowerCase().indexOf(search.val().toLowerCase()) > -1) {
            SearchTable.push(i);
        }
    });
    searchClick();
});
function searchClick() {
    current_tablePage = 1;
    let pageAmount,
        Table_NumHtml = "",
        endNum = current_tablePage * 8,
        beginNum = endNum - 8,
        tableDisplay = "",
        currentTable = "",
        active;
    if (search.val() != "") {
        pageAmount = Math.ceil(SearchTable.length / 8);
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += SearchTable[i];
        }
        currentTable = `Search`;
    } else {
        pageAmount = Math.ceil(TableBody.length / 8);
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += TableBody[i];
        }
        currentTable = `Main`;
    }

    for (let j = 1; j <= pageAmount; j++) {
        active =
            j == current_tablePage ? "admin__song-pagination-link--active" : "";

        Table_NumHtml +=
            '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' +
            currentTable +
            '`)">' +
            '<a class="admin__song-pagination-link ' +
            active +
            '">' +
            j +
            "</a></li>";
    }
    $("#Table_categories").html(Table_NumHtml);
    if (tableDisplay.indexOf("undefined") != 0) {
        $("#table-body").html(tableDisplay);
    } else {
        $("#table-body").html("");
        $(".NullValue").css("display", "block")

    }
}

function autocomplete(inp, arr) {
    var currentFocus;

    inp.addEventListener("input", function (e) {
        var a,
            b,
            i,
            n = 0,
            val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        // this.parentNode.appendChild(a);
        $(".container__header-with-search-result").append(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (
                arr[i].substr(0, val.length).toUpperCase() ==
                val.toUpperCase() &&
                n < 5
            ) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML =
                    "<strong>" +
                    arr[i].substr(0, val.length) +
                    "</strong>" +
                    arr[i].substr(val.length) +
                    "<input type='hidden' value='" +
                    arr[i] +
                    "'>";

                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
                n += 1;
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) {
            //up
            /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

}    