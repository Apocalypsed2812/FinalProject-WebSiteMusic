let addBtn = $(".admin__song-btn button"),
    XIcon = $(".auth-form__header i.fa-xmark"),
    cancelSongForm = $(".auth-form__controls-back"),
    Add_form = $("#myModal_AddSong"),
    Delete_form = $("#myModal_DeleteSong"),
    Edit_form = $("#myModal_EditSong"),
    View_form = $("#myModal_ViewSong"),
    FormAdd_InputBtn = $("#myModal_AddSong input[type='text']"),
    FormEdit_InputBtn = $("#myModal_EditSong input[type='text']"),
    DeleteSong_name = $("#deleteSong_Name"),
    table_page1 = $(".admin__song-pagination-list li:first-child a"),
    table_page,
    target_id,
    target_name,
    current_tablePage = 1,
    search = $(".HomePage .container__header-with-search-input"),
    TableBody,
    SearchTable,
    Suggestions,
    pageAmount;
// sau khi trang tải xong
$(document).ready(function () {
    // Add active cho sidebar
    $(".header__item:nth-child(3)").addClass("header__item--active");
    // Lấy dữ liệu bài hát
    getData();
    table_page1.addClass("admin__song-pagination-link--active");

    // lấy danh sách các thể loại bài hát
    get_song_category();
});

function get_song_category() {
    let category = `<option value=0>-- Thể loại --</option>`,
        n = 1;
    $.get(
        "http://localhost:" + location.port + "/admin/songs-api/get-category.php",
        function (data, status) {
            data["data"].forEach((e) => {
                category += `<option value=` + n + `>` + e['name'] + `</option>`
            })
            $('.song_category_list').html(category)
        },
        "json"
    );
}
function FirstPagination_click(e, table) {
    table_page1 = $(".admin__song-pagination-list li:first-child a");
    table_page = $(".admin__song-pagination-list li a");
    table_page.removeClass("admin__song-pagination-link--active");
    table_page1.addClass("admin__song-pagination-link--active");
    current_tablePage = 1;
    let endNum = current_tablePage * 8,
        beginNum = endNum - 8,
        tableDisplay = "";
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
    let isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
    let First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
    let tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
    let Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;
    let Table_NumHtml = "",
        active;
    console.log(First)
    console.log(current_tablePage)
    console.log(Last)
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
    for (let j = First; j <= Last; j++) {
        active =
            j == current_tablePage
                ? "admin__song-pagination-link--active"
                : "";
        Table_NumHtml +=
            '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' + table + '`)">' +
            '<a class="admin__song-pagination-link ' +
            active +
            '">' +
            j +
            "</a></li>";
    }
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';
    $("#Table_pagination").html(Table_NumHtml);


    $("#table-body").html(tableDisplay);
}
function LastPagination_click(e, table) {
    // table_page1 = $(".admin__song-pagination-list li:first-child a");
    table_page = $(".admin__song-pagination-list li a");
    table_page.removeClass("admin__song-pagination-link--active");
    // table_page1.addClass("admin__song-pagination-link--active");

    let endNum,
        beginNum,
        tableDisplay = "",
        current_tablePage;

    if (table == "Main") {
        current_tablePage = Math.ceil(TableBody.length / 8);
        endNum = current_tablePage * 8;
        beginNum = endNum - 8;
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += TableBody[i];
        }
        pageAmount = Math.ceil(TableBody.length / 8)
    } else {
        current_tablePage = Math.ceil(SearchTable.length / 8);
        endNum = current_tablePage * 8;
        beginNum = endNum - 8;
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += SearchTable[i];
        }
        pageAmount = Math.ceil(SearchTable.length / 8)
    }
    current_tablePage = parseInt(current_tablePage)
    // let isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
    // let First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
    // let tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
    // let Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;
    let First = pageAmount - 2;
    let Last = pageAmount;
    let Table_NumHtml = "",
        active;

    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
    for (let j = First; j <= Last; j++) {
        active = j == current_tablePage ? "admin__song-pagination-link--active" : "";
        Table_NumHtml +=
            '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' + table + '`)">' +
            '<a class="admin__song-pagination-link ' +
            active +
            '">' +
            j +
            "</a></li>";
    }
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';
    $("#Table_pagination").html(Table_NumHtml);


    $("#table-body").html(tableDisplay);
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
        pageAmount = Math.ceil(TableBody.length / 8)
    } else {
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += SearchTable[i];
        }
        pageAmount = Math.ceil(SearchTable.length / 8)
    }

    current_tablePage = parseInt(current_tablePage)
    let isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
    let First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
    let tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
    let Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;
    let Table_NumHtml = "",
        active;
    console.log(First)
    console.log(current_tablePage)
    console.log(Last)
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
    for (let j = First; j <= Last; j++) {
        active =
            j == current_tablePage
                ? "admin__song-pagination-link--active"
                : "";
        Table_NumHtml +=
            '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' + table + '`)">' +
            '<a class="admin__song-pagination-link ' +
            active +
            '">' +
            j +
            "</a></li>";
    }
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`' + table + '`)">' +
        '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';
    $("#Table_pagination").html(Table_NumHtml);


    $("#table-body").html(tableDisplay);
}
// đổi màu border và ẩn thông báo lỗi
//form Add
FormAdd_InputBtn.click(function () {
    FormAdd_InputBtn.css({ border: "1px solid #dbdbdb", });
    $("#Add_Error_Mess").css("visibility", "hidden");
});
//form Edit
FormEdit_InputBtn.click(function () {
    FormEdit_InputBtn.css({ border: "1px solid #dbdbdb", });
    $("#edit_Error_Mess").css("visibility", "hidden");

});
$("#song_files_add_song").click(function () {
    $("#Add_Error_Mess").css("visibility", "hidden");
})
// nút 'Thêm bài hát' => hiện form
addBtn.click(function () { Add_form.css("display", "flex") });

// nút 'X' và 'hủy' => đóng form
XIcon.click(function () {
    $(".modal").css("display", "none");
    $('.song_category_list').val(0)
    $("#song_name_add_song").val("");
    $("#song_singer_add_song").val("");
    $("#song_category_add").val(0);
    $("#song_nation_add").val(0);
    $("#song_Lyric_add_song").val("");
    $("#song_files_add_song").val("");
    $("#Add_Error_Mess").css("visibility", "hidden");
    $("#edit_Error_Mess").css("visibility", "hidden");
    $(".add-form_input").css("")
    FormAdd_InputBtn.css({ border: "1px solid #dbdbdb", });
    FormEdit_InputBtn.css({ border: "1px solid #dbdbdb", });

});
cancelSongForm.click(function () {
    $(".modal").css("display", "none");
    $('.song_category_list').val(0)
    $("#song_name_add_song").val("");
    $("#song_singer_add_song").val("");
    $("#song_category_add").val(0);
    $("#song_nation_add").val(0);
    $("#song_Lyric_add_song").val("");
    $("#song_files_add_song").val("");
    $("#Add_Error_Mess").css("visibility", "hidden");
    $("#edit_Error_Mess").css("visibility", "hidden");
    FormAdd_InputBtn.css({ border: "1px solid #dbdbdb", });
    FormEdit_InputBtn.css({ border: "1px solid #dbdbdb", });
});

// hàm lấy dữ liệu db chèn vào table
function getData() {
    let Suggestions = "";
    $.get(
        "http://localhost:" + location.port + "/admin/songs-api/get-song.php",
        function (data, status) {
            TableBody = [];
            let Song_Singer_Category = '';
            let lyric;
            data["data"].forEach((e) => {
                Song_Singer_Category += e["name"] + "_" + e["singer"] + "_" + e["category"] + ","
                if (Suggestions.indexOf(e["name"]) == -1) {
                    Suggestions += e["name"] + ",";
                }
                if (Suggestions.indexOf(e["singer"]) == -1) {
                    Suggestions += e["singer"] + ",";
                }
                lyric = e["lyric"];
                TableBody.push(
                    "<tr><td>" + e["id"] + "</td><td>"
                    + e["name"] + "</td><td>"
                    + e["singer"] + "</td><td>"
                    + e["listens"] + "</td><td>"
                    + e["comments"] + "</td><td> " +
                    + e["downloads"] + "</td><td> " +
                    '<i class="fa-solid fa-eye" onclick="Open_Dialog_View(' + e["id"] + ", '" + e["name"] + "'" + ", '"
                    + e["singer"] + "'" + ", '" + e["date"] + "'" + ", '" + e["category"] + "'" + ", '" + e["nation"] + "'" + ", `" + lyric + "`" + ", '"
                    + e["listens"] + "'" + ", '" + e["comments"] + "'" + ", '" + e["downloads"] + "'" + ", '" + e["file"] + "')\"></i>" +
                    '<i class="fa-solid fa-trash-can" onclick="Open_Dialog_Delete(' + e["id"] + ", '" + e["name"] + "')\"></i>" +
                    '<i class="fa-solid fa-pen-to-square" onclick="Open_Dialog_Edit(' + e["id"] + ", '" + e["name"] + "'" + ", '" +
                    e["singer"] + "'" + ", '" + e["category"] + "'" + ", '" + e["nation"] + "'" + ", `" + lyric + "`)\"></i>" +
                    '</td><td style="display: none">' +
                    e["category"] +
                    '</td><td style="display: none">' +
                    e["lyric"] +
                    '</td><td style="display: none">' +
                    e["file"] +
                    "</td></tr>"
                );
            });

            let endNum = current_tablePage * 8,
                beginNum = endNum - 8,
                tableDisplay = "";

            pageAmount = Math.ceil(data["data"].length / 8)
            let Table_NumHtml = "",
                active;

            // for (let j = 1; j <= pageAmount; j++) {
            //     active =
            //         j == current_tablePage
            //             ? "admin__song-pagination-link--active"
            //             : "";
            //     Table_NumHtml +=
            //         '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`Main`)">' +
            //         '<a class="admin__song-pagination-link ' +
            //         active +
            //         '">' +
            //         j +
            //         "</a></li>";
            // }
            current_tablePage = parseInt(current_tablePage)
            let isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
            let First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
            let tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
            let Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;
            console.log(First)
            console.log(current_tablePage)
            console.log(Last)
            Table_NumHtml +=
                '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`Main`)">' +
                '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
            for (let j = First; j <= Last; j++) {
                active =
                    j == current_tablePage
                        ? "admin__song-pagination-link--active"
                        : "";
                Table_NumHtml +=
                    '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`Main`)">' +
                    '<a class="admin__song-pagination-link ' +
                    active +
                    '">' +
                    j +
                    "</a></li>";
            }
            Table_NumHtml +=
                '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`Main`)">' +
                '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';

            $("#Table_pagination").html(Table_NumHtml);

            for (let i = beginNum; i < endNum; i++) {
                tableDisplay += TableBody[i];
            }
            $("#table-body").html(tableDisplay);
            $("#Search_value").html(Suggestions);
            $("#Song_Singer_Category").html(Song_Singer_Category.replaceAll("amp;", ""))
        },
        "json"
    );
}

//hàm thêm bài hát
function add_song() {
    let error = 0,
        nameBox = $("#song_name_add_song").val(),
        singer = $("#song_singer_add_song").val(),
        current_time = new Date(),
        category = $("#song_category_add :selected").text(),
        nation = $("#song_nation_add :selected").text(),
        lyric = $("#song_Lyric_add_song").val();

    let Song_Singer_Category = $("#Song_Singer_Category").html().toLowerCase().replaceAll("amp;", "").split(",");
    Song_Singer_Category.pop();
    try {
        song = $("#song_files_add_song").get(0).files[0].name;
    } catch (error) {
        song = "";
    }
    current_time =
        current_time.getFullYear() +
        "-" +
        current_time.getMonth() +
        "-" +
        current_time.getDate() +
        " " +
        current_time.getHours() +
        ":" +
        current_time.getMinutes() +
        ":" +
        current_time.getSeconds();
    let NSC = nameBox + "_" + singer + "_" + category;
    NSC = NSC.toLocaleLowerCase()
    $("#myForm").ajaxForm({
        complete: function (xhr) {
            if (nameBox == "" || singer == "" || category == "") {
                error = 1;
                if (nameBox == "") {
                    $("#Add_Error_Mess").html("Vui lòng nhập tên bài hát");
                    $("#song_name_add_song").css({
                        border: "1px solid red",
                    });
                    $("#song_name_add_song").focus();
                } else if (singer == "") {
                    $("#Add_Error_Mess").html("Vui lòng nhập tên ca sỹ");
                    $("#song_singer_add_song").css({
                        border: "1px solid red",
                    });
                    $("#song_singer_add_song").focus();
                } else if (category == "") {
                    $("#Add_Error_Mess").html("Vui lòng nhập thể loại nhạc");
                    $("#song_category_add_song").css({
                        border: "1px solid red",
                    });
                    $("#song_category_add_song").focus();
                }
                $("#Add_Error_Mess").css("visibility", "visible");
            } else {
                if (xhr.responseText) {
                    $i = xhr.responseText.split("\n");
                    $("#Add_Error_Mess").html($i[$i.length - 1]);
                    $("#Add_Error_Mess").css("visibility", "visible");
                    error = 1;
                } else {

                    if (Song_Singer_Category.indexOf(NSC) == -1) {
                        $.post("http://localhost:" + location.port + "/admin/songs-api/add-song.php",
                            {
                                name: nameBox,
                                singer: singer,
                                date: current_time,
                                category: category,
                                nation: nation,
                                lyric: lyric,
                                listens: 0,
                                comments: 0,
                                downloads: 0,
                                file: song,
                            }
                        );
                        $("#myModal_AddSong").css("display", "none");
                        // // getData();

                        // // xóa thông tin các ô vừa nhập
                        $("#song_name_add_song").val("");
                        $("#song_singer_add_song").val("");
                        $("#song_category_add").val(0);
                        $("#song_nation_add").val(0);
                        $("#song_Lyric_add_song").val("");
                        $("#song_files_add_song").val("");

                        // // hiện thông báo thành công
                        $("#Add_alert").html("Đã thêm thành công");
                        $("#Add_alert").show();
                        $("#Add_alert").delay(2000).slideUp(200, function () {
                            $("#Add_alert").hide(); // ẩn sau 3s
                        });
                        setTimeout(function () { getData() }, 20);
                    } else {
                        $("#Add_Error_Mess").html("Bài hát: " + nameBox + " của ca sĩ: " + singer + " đã tồn tại");
                        $("#song_name_add_song").css({
                            border: "1px solid red",
                        });
                        $("#song_name_add_song").focus();
                        $("#Add_Error_Mess").css("visibility", "visible");
                    }

                }
            }
        },
    });
}

// Mở dialog conform xóa bài hát
function Open_Dialog_Delete(id, name) {
    Delete_form.css("display", "flex");
    target_id = id;
    DeleteSong_name.html(name);
}

// Mở dialog edit bài hát
function Open_Dialog_Edit(id, name, singer, category, nation, lyric) {
    $("#song_id_edit_song").val(id);
    $("#song_name_edit_song").val(name);
    $("#song_singer_edit_song").val(singer);
    $("#song_category_edit :selected").text(category);
    $("#song_nation_edit :selected").text(nation);
    $("#song_lyric_edit_song").val(lyric);
    Edit_form.css("display", "flex");
}
// Mở dialog view bài hát
function Open_Dialog_View(id, name, singer, date, category, nation, lyric, listens, comments, downloads, file) {
    $("#viewSong_id").html(id);
    $("#viewSong_name").html(name);
    $("#viewSong_singer").html(singer);
    $("#viewSong_date").html(date);
    $("#viewSong_category").html(category);
    $("#viewSong_nation").html(nation);
    $("#song_lyric_view_song").val(lyric);
    $("#viewSong_listens").html(listens);
    $("#viewSong_comments").html(comments);
    $("#viewSong_downloads").html(downloads);
    $("#viewSong_file").html(file);

    View_form.css("display", "flex");
}
//Hàm xóa bài hát
function delete_song() {
    if ($("#table-body tr").length == 1) {
        current_tablePage -= 1;
    }
    $.post("http://localhost:" + location.port + "/admin/songs-api/delete-song.php", { id: target_id, });

    Delete_form.css("display", "none");
    // $('#myModal_DeleteSong').css("display", "none");
    $("#Add_alert").html("Đã xóa thành công");
    $("#Add_alert").show();
    $("#Add_alert")
        .delay(2000)
        .slideUp(200, function () {
            $("#Add_alert").hide(); // ẩn sau 3s
        });
    setTimeout(function () { getData() }, 20);
}
// hàm sửa thông tin bài hát
function edit_song() {
    target_id = $("#song_id_edit_song").val();
    nameBox = $("#song_name_edit_song").val();
    singer = $("#song_singer_edit_song").val();
    category = $("#song_category_edit :selected").text();
    nation = $("#song_nation_edit :selected").text();
    lyric = $("#song_lyric_edit_song").val();

    if (nameBox == "" || singer == "" || category == "") {
        if (nameBox == "") {
            $("#edit_Error_Mess").html("Vui lòng nhập tên bài hát");
            $("#song_name_edit_song").css({
                border: "1px solid red",
            });
            $("#song_name_edit_song").focus();
        } else if (singer == "") {
            $("#edit_Error_Mess").html("Vui lòng nhập tên ca sỹ");
            $("#song_singer_edit_song").css({
                border: "1px solid red",
            });
            $("#song_singer_edit_song").focus();
        } else if (category == "") {
            $("#edit_Error_Mess").html("Vui lòng nhập thể loại nhạc");
            $("#song_category_edit_song").css({
                border: "1px solid red",
            });
            $("#song_category_edit_song").focus();
        }
        $("#edit_Error_Mess").css("visibility", "visible");
    } else {
        $.post(
            "http://localhost:" +
            location.port +
            "/admin/songs-api/update-song.php",
            {
                id: target_id,
                name: nameBox,
                singer: singer,
                category: category,
                nation: nation,
                lyric: lyric,
            }
        );
        $("#myModal_EditSong").css("display", "none");
        // // getData();

        // // xóa thông tin các ô vừa nhập
        $("#song_name_edit_song").val("");
        $("#song_singer_edit_song").val("");
        $("#song_category_edit_song").val(0);
        $("#song_nation_edit").val(0);
        $("#song_lyric_edit_song").val("");

        // // hiện thông báo thành công
        $("#Add_alert").html("Thay đổi thành công");
        $("#Add_alert").show();
        $("#Add_alert")
            .delay(2000)
            .slideUp(200, function () {
                $("#Add_alert").hide(); // ẩn sau 3s
            });
        setTimeout(function () { getData() }, 20);

    }
}
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

// sự kiện onchange search input
$(".HomePage .container__header-with-search-input").on("input", function (e) {

    setTimeout(function () {
        let rowSuggestions = $("#myInputautocomplete-list>div").length;
        if (search.val() != "" && rowSuggestions != 0) {
            $(".container__header-with-search-result").css("visibility", "visible");
        } else {
            $(".container__header-with-search-result").css("visibility", "hidden");
        }
    }, 20);

    // $(".container__header-with-search-result").css("visibility", "visible");

    SearchTable = [];
    TableBody.forEach((i) => {
        if (i.toLowerCase().indexOf(search.val().toLowerCase()) > -1) {
            SearchTable.push(i);
        }
    });
});

//search input click
$(".HomePage .container__header-with-search-input").click(function () {
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
$(".HomePage .fa-magnifying-glass").click(function () {
    $(".NullValue").css("display", "none")
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

    // for (let j = 1; j <= pageAmount; j++) {
    //     active =
    //         j == current_tablePage ? "admin__song-pagination-link--active" : "";

    //     Table_NumHtml +=
    //         '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' +
    //         currentTable +
    //         '`)">' +
    //         '<a class="admin__song-pagination-link ' +
    //         active +
    //         '">' +
    //         j +
    //         "</a></li>";
    // }
    current_tablePage = parseInt(current_tablePage)
    let isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
    let First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
    let tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
    let Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;

    console.log(First)
    console.log(current_tablePage)
    console.log(Last)
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`' + currentTable + '`)">' +
        '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
    for (let j = First; j <= Last; j++) {
        active =
            j == current_tablePage
                ? "admin__song-pagination-link--active"
                : "";
        Table_NumHtml +=
            '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' + currentTable + '`)">' +
            '<a class="admin__song-pagination-link ' +
            active +
            '">' +
            j +
            "</a></li>";
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
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

