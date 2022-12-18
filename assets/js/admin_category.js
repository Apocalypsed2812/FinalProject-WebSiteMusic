let XIcon = $(".auth-form__header i.fa-xmark"),
    cancelSongForm = $(".auth-form__controls-back"),
    target_id, TableBody, Suggestions,
    current_tablePage = 1,
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
                Table_NumHtml = "",
                active;

            pageAmount = Math.ceil(data["data"].length / 8)
            current_tablePage = parseInt(current_tablePage)
            let isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
            let First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
            let tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
            let Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;

            Table_NumHtml +=
                '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`Main`)">' +
                '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
            for (let j = First; j <= Last; j++) {
                active = j == current_tablePage ? "admin__song-pagination-link--active" : "";
                Table_NumHtml +=
                    '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`Main`)">' +
                    '<a class="admin__song-pagination-link ' + active + '">' + j + "</a></li>";
            }
            Table_NumHtml +=
                '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`Main`)">' +
                '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';

            $("#Table_pagination").html(Table_NumHtml);
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
        let rowSuggestions = $("#myInputsuggestions_search-list>div").length;
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
function FirstPagination_click(e, table) {
    let tableDisplay = "",
        First = 1,
        Last,
        Table_NumHtml = "",
        active,
        pageAmount;
    current_tablePage = 1
    if (table == "Main") {
        pageAmount = Math.ceil(TableBody.length / 8);
        for (let i = 0; i < 8; i++) {
            tableDisplay += TableBody[i];
        }
    } else {
        pageAmount = Math.ceil(SearchTable.length / 8);
        for (let i = 0; i < 8; i++) {
            tableDisplay += SearchTable[i];
        }
    }
    Last = pageAmount < 3 ? pageAmount : 3;

    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
    for (let j = First; j <= Last; j++) {
        active = j == current_tablePage ? "admin__song-pagination-link--active" : "";
        Table_NumHtml +=
            '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' + table + '`)">' +
            '<a class="admin__song-pagination-link ' + active + '">' + j + "</a></li>";
    }
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';
    $("#Table_pagination").html(Table_NumHtml);
    $("#table-body").html(tableDisplay);
}
// sự kiện click vào btn "Cuối" của table pagination
function LastPagination_click(e, table) {

    let endNum,
        beginNum,
        tableDisplay = "", First, Last;

    if (table == "Main") {
        current_tablePage = Math.ceil(TableBody.length / 8);
        endNum = current_tablePage * 8;
        beginNum = endNum - 8;
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += TableBody[i];
        }
    } else {
        current_tablePage = Math.ceil(SearchTable.length / 8);
        endNum = current_tablePage * 8;
        beginNum = endNum - 8;
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += SearchTable[i];
        }
    }
    current_tablePage = parseInt(current_tablePage)

    First = current_tablePage < 3 ? 1 : current_tablePage - 2
    Last = current_tablePage;

    let Table_NumHtml = "",
        active;

    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
    for (let j = First; j <= Last; j++) {
        active = j == current_tablePage ? "admin__song-pagination-link--active" : "";
        Table_NumHtml +=
            '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' + table + '`)">' +
            '<a class="admin__song-pagination-link ' + active + '">' + j + "</a></li>";
    }
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';

    $("#Table_pagination").html(Table_NumHtml);
    $("#table-body").html(tableDisplay);
}
//Pagination_click
function Pagination_click(e, table) {

    current_tablePage = $(e).text();
    let endNum = current_tablePage * 8,
        beginNum = endNum - 8,
        tableDisplay = "",
        isFirst, First, tablePageDisplay, Last;

    if (table == "Main") {
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += TableBody[i];
        }
        pageAmount = Math.ceil(TableBody.length / 8)
    } else {
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += SearchTable[i];
        }
        pageAmount = Math.ceil(SearchTable.length / 8)
    }
    current_tablePage = parseInt(current_tablePage)
    switch (pageAmount) {
        case 1:
            First = 1
            Last = 1
            break;
        case 2:
            First = 1
            Last = 2
            break;
        default:
            isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
            First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
            tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
            Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;
    }
    let Table_NumHtml = "",
        active;

    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
    for (let j = First; j <= Last; j++) {
        active = j == current_tablePage ? "admin__song-pagination-link--active" : "";
        Table_NumHtml +=
            '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' + table + '`)">' +
            '<a class="admin__song-pagination-link ' + active + '">' + j + "</a></li>";
    }
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';
    $("#Table_pagination").html(Table_NumHtml);
    $("#table-body").html(tableDisplay);
}

//search input click
$(".CategoryPage .container__header-with-search-input").click(function () {
    Suggestions = $("#Category_value").html().split(",");
    Suggestions.pop();
    suggestions_search(Suggestions);
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

// // click các gợi ý trong  - 'Đề xuất cho bạn'
// $("#myInputsuggestions_search-list").click(function () {
//     search.val($(this).html());

//     SearchTable = [];
//     TableBody.forEach((i) => {
//         if (i.toLowerCase().indexOf(search.val().toLowerCase()) > -1) {
//             SearchTable.push(i);
//         }
//     });
//     searchClick();
// });
function searchClick() {
    current_tablePage = 1;
    let pageAmount,
        Table_NumHtml = "",
        endNum = current_tablePage * 8,
        beginNum = endNum - 8,
        tableDisplay = "",
        currentTable = "",
        active, isFirst, First, tablePageDisplay, Last;
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
    current_tablePage = parseInt(current_tablePage)
    switch (pageAmount) {
        case 1:
            First = 1
            Last = 1
            break;
        case 2:
            First = 1
            Last = 2
            break;
        default:
            isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
            First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
            tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
            Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;
    }
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`' + currentTable + '`)">' +
        '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
    for (let j = First; j <= Last; j++) {
        active = j == current_tablePage ? "admin__song-pagination-link--active" : "";
        Table_NumHtml +=
            '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' + currentTable + '`)">' +
            '<a class="admin__song-pagination-link ' + active + '">' + j + "</a></li>";
    }
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`' + currentTable + '`)">' +
        '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';
    $("#Table_pagination").html(Table_NumHtml);

    if (tableDisplay.indexOf("undefined") != 0) {
        $("#table-body").html(tableDisplay);
    } else {
        $("#table-body").html("");
        $(".NullValue").css("display", "block")

    }
}
function SearchItemClick(e) {
    $("#myInput").val(e)
    SearchTable = [];
    TableBody.forEach((i) => {
        if (i.toLowerCase().indexOf(e.toLowerCase()) > -1) {
            SearchTable.push(i);
        }
    });
    $(".NullValue").css("display", "none")
    searchClick();
};
// Gợi ý cho input search
function suggestions_search(arr) {
    var suggestionsItem, suggestionsList;
    $("#myInput").on('input', function () {
        let n = 0, SearchValue = this.value;

        if (SearchValue == "") {
            return false;
        }
        $(".container__header-with-search-result").html(`<h4>Đề xuất cho bạn</h4>`)
        suggestionsList = `<div id="` + this.id + `suggestions_search-list" class="suggestions_search-items">`
        suggestionsItem = ''

        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, SearchValue.length).toUpperCase() == SearchValue.toUpperCase() && n < 5) {
                suggestionsItem += `<div onclick="SearchItemClick('` + arr[i] + `')"><strong>` +
                    arr[i].substr(0, SearchValue.length) + `</strong>` + arr[i].substr(SearchValue.length) +
                    `<input type='hidden' value='` + arr[i] + `'></div>`;
                n += 1;
            }
        }
        suggestionsList += suggestionsItem + `</div>`
        $(".container__header-with-search-result").append(suggestionsList)
    })
}
// function suggestions_search(inp, arr) {
//     var currentFocus;

//     inp.addEventListener("input", function (e) {
//         var a, b, i, n = 0,
//             val = this.value;
//         closeAllLists();
//         if (!val) {
//             return false;
//         }
//         currentFocus = -1;
//         a = document.createElement("DIV");
//         a.setAttribute("id", this.id + "suggestions_search-list");
//         a.setAttribute("class", "suggestions_search-items");

//         $(".container__header-with-search-result").append(a);

//         for (i = 0; i < arr.length; i++) {

//             if (
//                 arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase() &&
//                 n < 5
//             ) {
//                 b = document.createElement("DIV");
//                 b.innerHTML =
//                     "<strong>" +
//                     arr[i].substr(0, val.length) +
//                     "</strong>" +
//                     arr[i].substr(val.length) +
//                     "<input type='hidden' value='" +
//                     arr[i] +
//                     "'>";

//                 b.addEventListener("click", function (e) {
//                     inp.value = this.getElementsByTagName("input")[0].value;
//                     SearchTable = [];
//                     TableBody.forEach((i) => {
//                         if (i.toLowerCase().indexOf(inp.value.toLowerCase()) > -1) {
//                             SearchTable.push(i);
//                         }
//                     });
//                     searchClick();
//                     closeAllLists();
//                 });
//                 a.appendChild(b);
//                 n += 1;
//             }
//         }
//     });
//     inp.addEventListener("keydown", function (e) {
//         var x = document.getElementById(this.id + "suggestions_search-list");
//         if (x) x = x.getElementsByTagName("div");
//         if (e.keyCode == 40) {
//             currentFocus++;
//             addActive(x);
//         } else if (e.keyCode == 38) {

//             currentFocus--;
//             addActive(x);
//         } else if (e.keyCode == 13) {
//             e.preventDefault();
//             if (currentFocus > -1) {
//                 if (x) x[currentFocus].click();
//             }
//         }
//     });
//     function addActive(x) {
//         if (!x) return false;
//         removeActive(x);
//         if (currentFocus >= x.length) currentFocus = 0;
//         if (currentFocus < 0) currentFocus = x.length - 1;
//         x[currentFocus].classList.add("suggestions_search-active");
//     }
//     function removeActive(x) {
//         for (var i = 0; i < x.length; i++) {
//             x[i].classList.remove("suggestions_search-active");
//         }
//     }
//     function closeAllLists(elmnt) {

//         var x = document.getElementsByClassName("suggestions_search-items");
//         for (var i = 0; i < x.length; i++) {
//             if (elmnt != x[i] && elmnt != inp) {
//                 x[i].parentNode.removeChild(x[i]);
//             }
//         }
//     }

//     document.addEventListener("click", function (e) {
//         closeAllLists(e.target);
//     });
// }

//sort
$("#Icon_arrow_down").click(function () {
    $("#Icon_arrow_down").css("display", "none")
    $("#Icon_arrow_up").css("display", "inline-block")
    Sort();
})
$("#Icon_arrow_up").click(function () {
    $("#Icon_arrow_up").css("display", "none")
    $("#Icon_arrow_down").css("display", "inline-block")
    Sort();
})
$("#SortList").change(function () {
    Sort();
})
function Sort() {
    let sortOption = $("#SortList").find(":selected").val(),
        ASC = $("#Icon_arrow_up").css("display") == 'inline-block' ? "ASC" : "DESC";
    let sql = "SELECT * FROM `categorys` ORDER BY `" + sortOption + "` " + ASC


    $.get(
        "http://localhost:" + location.port + "/admin/songs-api/sort-song.php",
        {
            sql: sql
        },
        function (data, status) {
            TableBody = [];
            data["data"].forEach((e) => {

                TableBody.push(
                    "<tr><td>" + e["id"] +
                    "</td><td>" + e["name"] +
                    "</td><td>" + e["numberOfsong"] +
                    "</td><td>" + e["follow"] +
                    "</td><td>" + e["date"] +
                    "</td><td>" +
                    '<i class="fa-solid fa-trash-can" onclick="Open_Dialog_Delete(' + e["id"] + ',`' + e["name"] + '`)"></i>' +
                    '<i class="fa-solid fa-pen-to-square" onclick="Open_Dialog_Edit(' + e["id"] + ',`' + e["name"] + '`)"></i>' +
                    "</td></tr>"
                );

            });
            let endNum = current_tablePage * 8,
                beginNum = endNum - 8,
                tableDisplay = "",
                Table_NumHtml = "",
                active;

            pageAmount = Math.ceil(data["data"].length / 8)
            current_tablePage = parseInt(current_tablePage)
            let isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
            let First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
            let tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
            let Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;

            Table_NumHtml +=
                '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`Main`)">' +
                '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
            for (let j = First; j <= Last; j++) {
                active = j == current_tablePage ? "admin__song-pagination-link--active" : "";
                Table_NumHtml +=
                    '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`Main`)">' +
                    '<a class="admin__song-pagination-link ' + active + '">' + j + "</a></li>";
            }
            Table_NumHtml +=
                '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`Main`)">' +
                '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';

            $("#Table_pagination").html(Table_NumHtml);
            for (let i = beginNum; i < endNum; i++) {
                tableDisplay += TableBody[i];
            }
            $("#table-body").html(tableDisplay);



            if (search.val() != "") {
                SearchTable = [];
                TableBody.forEach((i) => {
                    if (i.toLowerCase().indexOf(search.val().toLowerCase()) > -1) {
                        SearchTable.push(i);
                    }
                });
                searchClick();
            }
        }, "json"
    );
}

