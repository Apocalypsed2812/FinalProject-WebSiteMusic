let XIcon = $(".auth-form__header i.fa-xmark"),
    cancelSongForm = $(".auth-form__controls-back"),
    target_id,
    TableBody,
    current_tablePage = 1,
    Suggestions,
    search = $(".CategoryPage .container__header-with-search-input");

$(document).ready(function () {
    // Add active cho sidebar
    $(".header__item:nth-child(2)").addClass("header__item--active");
    // Lấy dữ liệu bài hát
    postNum();
    setTimeout(function () { getData() }, 20);
});

// post song number of catrgory
function postNum() {
    $.get(
        "http://localhost:" + location.port + "/admin/category-api/get-category.php",
        function (data, status) {
            data["data"].forEach((e) => {
                let num = 0;
                $.get(
                    "http://localhost:" + location.port + "/admin/category-api/get-song-num.php", {
                    categoryName: e['name'],
                }, function (data, status) {
                    num = data["data"].length

                    $.post("http://localhost:" + location.port + "/admin/category-api/post-song-num.php",
                        {
                            id: e['id'],
                            num: num
                        });

                },
                    "json"
                );

            });
            getData();
        },
        "json"
    );
}
// lấy data
function getData() {
    // let Suggestions = "";
    let categoryValue;

    $.get(
        "http://localhost:" + location.port + "/admin/category-api/get-category.php",
        function (data, status) {
            TableBody = [];
            // let EmailValue = '', UsernameValue = '';
            categoryValue = '';
            data["data"].forEach((e) => {

                TableBody.push(
                    "<tr><td>" + e["id"] +
                    "</td><td>" + e["name"] +
                    "</td><td>" + e["numberOfsong"] +
                    "</td><td>" + e["follow"] +
                    "</td><td>" + e["date"] +
                    "</td><td>" +
                    // '<i class="fa-solid fa-eye" onclick="Open_Dialog_View()"></i>' +
                    '<i class="fa-solid fa-trash-can" onclick="Open_Dialog_Delete(' + e["id"] + ',`' + e["name"] + '`)"></i>' +
                    '<i class="fa-solid fa-pen-to-square" onclick="Open_Dialog_Edit(' + e["id"] + ',`' + e["name"] + '`)"></i>' +
                    "</td></tr>"
                );
                categoryValue += e["name"] + ","

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
                // onclick="Pagination_click($(this),`Main`)"
            }
            $("#CategoryTable_pagination").html(Table_NumHtml);
            for (let i = beginNum; i < endNum; i++) {
                tableDisplay += TableBody[i];
            }
            $("#table-body").html(tableDisplay);
            $("#Category_value").html(categoryValue);

        },
        "json"
    );
}

// Thêm thể loại
$("#category_add_btn").click(function () {
    $("#myModal_AddCategory").css("display", "flex")
})
// nút 'X' và 'hủy' => đóng form
XIcon.click(function () {
    $(".modal").css("display", "none");
    $("#category_add").css({ border: "1px solid #dbdbdb" });
    $("#Add_Error_Mess").css("visibility", "hidden");
    $("#category_name_edit").css({ border: "1px solid #dbdbdb" });
    $("#edit_Error_Mess").css("visibility", "hidden");
    $("#category_add").val("");
    $("#category_name_edit").val("");
});
cancelSongForm.click(function () {
    $(".modal").css("display", "none");
    $("#category_add").css({ border: "1px solid #dbdbdb" });
    $("#Add_Error_Mess").css("visibility", "hidden");
    $("#category_name_edit").css({ border: "1px solid #dbdbdb" });
    $("#edit_Error_Mess").css("visibility", "hidden");
    $("#category_add").val("");
    $("#category_name_edit").val("");
});
// input click 
$("#category_add").click(function () {
    $("#category_add").css({ border: "1px solid #dbdbdb" });
    $("#Add_Error_Mess").css("visibility", "hidden");
})
$("#category_name_edit").click(function () {
    $("#category_name_edit").css({ border: "1px solid #dbdbdb" });
    $("#edit_Error_Mess").css("visibility", "hidden");
})

// add category
function add_category() {
    let categoryValue = $("#Category_value").html().split(","),
        inputValue = $("#category_add").val(),
        current_time = new Date();

    categoryValue.pop();

    let lower = categoryValue.map(e => {
        return e.replaceAll("amp;", "").toLowerCase();
    });
    console.log(lower)

    current_time = current_time.getFullYear() + "-" + current_time.getMonth() + "-" + current_time.getDate() + " " +
        current_time.getHours() + ":" + current_time.getMinutes() + ":" + current_time.getSeconds();

    if (inputValue == "") {
        $("#Add_Error_Mess").html("Vui lòng nhập thể loại");
        $("#category_add").css({
            border: "1px solid red",
        });
        $("#category_add").focus();
        $("#Add_Error_Mess").css("visibility", "visible");

    } else {

        if (lower.indexOf(inputValue.toLowerCase()) == -1) {
            $.post("http://localhost:" + location.port + "/admin/category-api/add-category.php",
                {
                    name: inputValue,
                    numberOfsong: 0,
                    follow: 0,
                    date: current_time,
                }
            );
            $("#myModal_AddCategory").css("display", "none");
            $("#category_add").val("");

            $("#category_alert").html("Thêm thành công");
            $("#category_alert").show();
            $("#category_alert").delay(2000).slideUp(200, function () {
                $("#category_alert").hide(); // ẩn sau 3s
            });
            getData();
        } else {
            $("#Add_Error_Mess").html("Thể loại này đã tồn tại");
            $("#category_add").css({ border: "1px solid red", });
            $("#category_add").focus();
            $("#Add_Error_Mess").css("visibility", "visible");
        }
    }
    getData();
}
// delete category
function delete_category() {
    if ($("#table-body tr").length == 1) {
        current_tablePage -= 1;
    }
    $.post("http://localhost:" + location.port + "/admin/category-api/delete-category.php", { id: target_id, });

    getData();
    $("#myModal_DeleteCategory").css("display", "none");
    // $('#myModal_DeleteSong').css("display", "none");
    $("#category_alert").html("Đã xóa thành công");
    $("#category_alert").show();
    $("#category_alert").delay(2000).slideUp(200, function () {
        $("#category_alert").hide(); // ẩn sau 3s
    });
    getData();
}
// edit category
function edit_category() {
    let categoryValue = $("#Category_value").html().split(","),
        name = $("#category_name_edit").val();

    categoryValue.pop();

    let lower = categoryValue.map(e => {
        return e.toLowerCase();
    });

    if (name == "") {
        $("#edit_Error_Mess").html("Vui lòng nhập thể loại");
        $("#category_name_edit").css({
            border: "1px solid red",
        });
        $("#category_name_edit").focus();
        $("#edit_Error_Mess").css("visibility", "visible");

    } else {
        if (lower.indexOf(name.toLowerCase()) == -1) {
            $.post("http://localhost:" + location.port + "/admin/category-api/update-category.php", {
                id: target_id,
                name: name
            });

            getData();
            $("#myModal_EditCategory").css("display", "none");
            // $('#myModal_DeleteSong').css("display", "none");
            $("#category_alert").html("Đã xóa thành công");
            $("#category_alert").show();
            $("#category_alert").delay(2000).slideUp(200, function () {
                $("#category_alert").hide(); // ẩn sau 3s
            });
        } else {
            $("#edit_Error_Mess").html("Thể loại này đã tồn tại");
            $("#category_name_edit").css({ border: "1px solid red", });
            $("#category_name_edit").focus();
            $("#edit_Error_Mess").css("visibility", "visible");
        }
    }

    getData();
}
function Open_Dialog_Delete(id, name) {
    $("#deleteCategory_Name").html(name)
    target_id = id;
    $("#myModal_DeleteCategory").css("display", "flex")
}
function Open_Dialog_Edit(id, name) {
    $("#category_name_edit").val(name);
    target_id = id;
    $("#myModal_EditCategory").css("display", "flex")
}

// sự kiện onchange search input
$(".CategoryPage .container__header-with-search-input").on("input", function (e) {
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

//Pagination_click
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

//search input click
$(".CategoryPage .container__header-with-search-input").click(function () {
    Suggestions = $("#Category_value").html().split(",");
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
$(".CategoryPage .fa-magnifying-glass").click(function () {
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
    $("#CategoryTable_pagination").html(Table_NumHtml);
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
    /*execute a function when someone clicks in the document:*/
    // document.addEventListener("click", function (e) {
    //     closeAllLists(e.target);
    // });
}