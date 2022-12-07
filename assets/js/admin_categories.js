let XIcon = $(".auth-form__header i.fa-xmark"),
    cancelSongForm = $(".auth-form__controls-back"),
    target_id,
    TableBody,
    current_tablePage = 1,
    Suggestions,
    search = $(".CategoriesPage .container__header-with-search-input"),
    target_name_topic;

$(document).ready(function () {
    // Add active cho sidebar
    $(".header__item:nth-child(1)").addClass("header__item--active");
    // Lấy dữ liệu bài hát
    getData();
});

// lấy data
function getData() {
    // let Suggestions = "";

    $.get(
        "http://localhost:" + location.port + "/admin/categories-api/get-categories.php",
        function (data, status) {
            TableBody = [];
            // let EmailValue = '', UsernameValue = '';
            let categoriesValue = '',
                searchValue = '';
            data["data"].forEach((e) => {
                let num1 = e["songs"].split(",").length;
                let num2 = e["songs"].split("\n").length;
                let num = num1 > num2 ? num1 : num2
                num = e["songs"] == [] ? 0 : num
                TableBody.push(
                    "<tr><td>" + e["id"] +
                    "</td><td>" + e["name"] +
                    "</td><td>" + e["topic"] +
                    "</td><td>" + e["follow"] +
                    "</td><td>" + num +
                    "</td><td>" + e["date"] +
                    "</td><td>" +
                    '<i class="fa-solid fa-eye" onclick="Open_Dialog_View(' + e["id"] + ',`' + e["name"] + '`,`' +
                    e["topic"] + '`,`' + e["follow"] + '`,`' + e["date"] + '`,`' + e["image"] + '`,`' + e["description"] + '`,`' + e["singers"] + '`,`' + e["songs"] + '`)"></i>' +
                    '<i class="fa-solid fa-trash-can" onclick="Open_Dialog_Delete(' + e["id"] + ',`' + e["name"] + '`)"></i>' +
                    '<i class="fa-solid fa-pen-to-square" onclick="Open_Dialog_Edit(' + e["id"] + ',`' + e["name"] + '`,`' +
                    e["topic"] + '`,`' + e["description"] + '`,`' + e["singers"] + '`,`' + e["songs"] + '`)"></i>' +
                    "</td><td style='display: none;'>" + e["image"] +
                    "</td><td style='display: none;'>" + e["description"] +
                    "</td><td style='display: none;'>" + e["singers"] +
                    "</td><td style='display: none;'>" + e["songs"] +
                    +"</td></tr>"
                );
                categoriesValue += e["name"] + '_' + e["topic"] + ","
                searchValue += e["name"] + ",";
                if (!searchValue.includes(e["topic"])) {
                    searchValue += e["topic"] + ",";
                }
            });
            let endNum = current_tablePage * 8,
                beginNum = endNum - 8,
                tableDisplay = "",
                Table_NumHtml = "",
                active;
            pageAmount = Math.ceil(data["data"].length / 8);
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
            $("#Categories_value").html(categoriesValue);
            $("#Search_value").html(searchValue);
        },
        "json"
    );
}

// // Thêm chuyên mục
$("#categories_add_btn").click(function () {
    $("#myModal_AddCategories").css("display", "flex")
})

// nút 'X' và 'hủy' => đóng form
XIcon.click(function () {
    $(".modal").css("display", "none");
    $("#categories_add").css({ border: "1px solid #dbdbdb" });
    $("#Add_Error_Mess").css("visibility", "hidden");
    $("#categories_name_edit").css({ border: "1px solid #dbdbdb" });
    $("#edit_Error_Mess").css("visibility", "hidden");
    $("#categories_add").val("");
    $("#topic_name").val(0);
    $("#Categories_description").val("");
    $("#Categories_singer").val("");
    $("#Categories_song").val("");
    $("#Categories_image").val("");
});
cancelSongForm.click(function () {
    $(".modal").css("display", "none");
    $("#categories_add").css({ border: "1px solid #dbdbdb" });
    $("#Add_Error_Mess").css("visibility", "hidden");
    $("#categories_name_edit").css({ border: "1px solid #dbdbdb" });
    $("#edit_Error_Mess").css("visibility", "hidden");
    $("#categories_add").val("");
    $("#topic_name").val(0);
    $("#Categories_description").val("");
    $("#Categories_singer").val("");
    $("#Categories_song").val("");
    $("#Categories_image").val("");
});
// input click 
$(".add-form_input").click(function () {
    $(".add-form_input").css({ border: "1px solid #dbdbdb" });
    $("#Add_Error_Mess").css("visibility", "hidden");
    $("#edit_Error_Mess").css("visibility", "hidden");
})


// // add categories
function add_categories() {
    let categoriesValue = $("#Categories_value").html().split(","),
        Categories_name = $("#categories_add").val(),
        Categories_topic = $("#topic_name option:selected").text(),
        Categories_description = $("#Categories_description").val(),
        Categories_singer = $("#Categories_singer").val(),
        Categories_song = $("#Categories_song").val(),
        current_time = new Date(),
        Categories_image,
        error = 0,
        Categories_name_topic;
    // nếu chưa chọn file thì trả về chuỗi rỗng
    try {
        Categories_image = $("#Categories_image").get(0).files[0].name;
    } catch (error) {
        Categories_image = "";
    }
    // format thời gian
    current_time = current_time.getFullYear() + "-" + current_time.getMonth() + "-" + current_time.getDate() + " " +
        current_time.getHours() + ":" + current_time.getMinutes() + ":" + current_time.getSeconds();
    //bỏ phần tử rổng cuối mảng
    categoriesValue.pop();
    // chuyển các từ trong arr về chử thường
    let lower = categoriesValue.map(e => {
        return e.toLowerCase();
    });

    // error = Categories_song == "" ? 1 : error;
    error = Categories_singer == "" ? 2 : error;
    error = Categories_topic == "-- topic --" ? 3 : error;
    error = Categories_name == "" ? 4 : error;
    console.log(Categories_name)
    console.log(Categories_topic)
    console.log(error)

    $("#myAddCategoriesForm").ajaxForm({
        complete: function (xhr) {
            if (xhr.responseText) {
                $i = xhr.responseText.split("\n");
                $("#Add_Error_Mess").html($i[$i.length - 1]);
                $("#Add_Error_Mess").css("visibility", "visible");
                error = 1;
            } else {
                switch (error) {
                    // case 1:
                    //     $("#Add_Error_Mess").html("Vui lòng nhập các bài hát");
                    //     $("#Categories_song").css({ border: "1px solid red", });
                    //     $("#Categories_song").focus();
                    //     $("#Add_Error_Mess").css("visibility", "visible");
                    //     break;
                    case 2:
                        $("#Add_Error_Mess").html("Vui lòng nhập tên ca sĩ");
                        $("#Categories_singer").css({ border: "1px solid red", });
                        $("#Categories_singer").focus();
                        $("#Add_Error_Mess").css("visibility", "visible");
                        break;
                    case 3:
                        $("#Add_Error_Mess").html("Vui lòng nhập chọn topic");
                        $("#topic_name").css({ border: "1px solid red", });
                        $("#topic_name").focus();
                        $("#Add_Error_Mess").css("visibility", "visible");
                        break;
                    case 4:
                        $("#Add_Error_Mess").html("Vui lòng nhập tên chuyên mục");
                        $("#categories_add").css({ border: "1px solid red", });
                        $("#categories_add").focus();
                        $("#Add_Error_Mess").css("visibility", "visible");
                        break;
                    case 0:
                        Categories_name_topic = Categories_name + "_" + Categories_topic;
                        if (lower.indexOf(Categories_name_topic.toLowerCase()) == -1) {
                            $.post("http://localhost:" + location.port + "/admin/categories-api/add-categories.php",
                                {
                                    name: Categories_name,
                                    topic: Categories_topic,
                                    follow: 0,
                                    image: Categories_image,
                                    date: current_time,
                                    description: Categories_description,
                                    singers: Categories_singer,
                                    songs: Categories_song,
                                }
                            );

                            // // // xóa thông tin các ô vừa nhập
                            $("#categories_add").val("");
                            $("#topic_name").val(0);
                            $("#Categories_description").val("");
                            $("#Categories_singer").val("");
                            $("#Categories_song").val("");
                            $("#Categories_image").val("");

                            $("#myModal_AddCategories").css("display", "none");

                            $("#Add_alert").html("Thêm thành công");
                            $("#Add_alert").show();
                            $("#Add_alert").delay(2000).slideUp(200, function () {
                                $("#Add_alert").hide(); // ẩn sau 3s
                            });
                            setTimeout(function () { getData() }, 20);


                        } else {
                            $("#Add_Error_Mess").html("chuyên mục này đã tồn tại trong topic " + Categories_topic);
                            $("#categories_add").css({ border: "1px solid red", });
                            $("#categories_add").focus();
                            $("#Add_Error_Mess").css("visibility", "visible");
                        }
                        break;
                }
            }
        },
    });

    // switch (error) {
    //     case 1:
    //         $("#Add_Error_Mess").html("Vui lòng nhập các bài hát");
    //         $("#Categories_song").css({ border: "1px solid red", });
    //         $("#Categories_song").focus();
    //         $("#Add_Error_Mess").css("visibility", "visible");
    //         break;
    //     // case 2:
    //     //     $("#Add_Error_Mess").html("Vui lòng nhập tên ca sĩ");
    //     //     $("#Categories_singer").css({ border: "1px solid red", });
    //     //     $("#Categories_singer").focus();
    //     //     $("#Add_Error_Mess").css("visibility", "visible");
    //     //     break;
    //     // case 3:
    //     //     $("#Add_Error_Mess").html("Vui lòng nhập chọn topic");
    //     //     $("#topic_name").css({ border: "1px solid red", });
    //     //     $("#topic_name").focus();
    //     //     $("#Add_Error_Mess").css("visibility", "visible");
    //     //     break;
    //     // case 4:
    //     //     $("#Add_Error_Mess").html("Vui lòng nhập tên chuyên mục");
    //     //     $("#categories_add").css({ border: "1px solid red", });
    //     //     $("#categories_add").focus();
    //     //     $("#Add_Error_Mess").css("visibility", "visible");
    //     //     break;
    //     case 0:
    //         Categories_name_topic = Categories_name + "_" + Categories_topic;
    //         if (lower.indexOf(Categories_name_topic.toLowerCase()) == -1) {
    //             $("#myAddCategoriesForm").ajaxForm({
    //                 complete: function (xhr) {
    //                     if (xhr.responseText) {
    //                         $i = xhr.responseText.split("\n");
    //                         $("#Add_Error_Mess").html($i[$i.length - 1]);
    //                         $("#Add_Error_Mess").css("visibility", "visible");
    //                         error = 1;
    //                     } else {
    //                         console.log(Categories_name)
    //                         console.log(Categories_topic)
    //                         $.post("http://localhost:" + location.port + "/admin/categories-api/add-categories.php",
    //                             {
    //                                 name: Categories_name,
    //                                 topic: Categories_topic,
    //                                 follow: 0,
    //                                 image: Categories_image,
    //                                 date: current_time,
    //                                 description: Categories_description,
    //                                 singers: Categories_singer,
    //                                 songs: Categories_song,
    //                             }
    //                         );

    //                         // // // xóa thông tin các ô vừa nhập
    //                         $("#categories_add").val("");
    //                         $("#topic_name").val(0);
    //                         $("#Categories_description").val("");
    //                         $("#Categories_singer").val("");
    //                         $("#Categories_song").val("");
    //                         $("#Categories_image").val("");

    //                         $("#myModal_AddCategories").css("display", "none");

    //                         $("#Add_alert").html("Thêm thành công");
    //                         $("#Add_alert").show();
    //                         $("#Add_alert").delay(2000).slideUp(200, function () {
    //                             $("#Add_alert").hide(); // ẩn sau 3s
    //                         });
    //                         setTimeout(function () { getData() }, 20);
    //                     }
    //                 },
    //             });

    //         } else {
    //             $("#Add_Error_Mess").html("chuyên mục này đã tồn tại trong topic " + Categories_topic);
    //             $("#categories_add").css({ border: "1px solid red", });
    //             $("#categories_add").focus();
    //             $("#Add_Error_Mess").css("visibility", "visible");
    //         }
    //         break;
    // }



}
// // delete categories
function delete_categories() {
    if ($("#table-body tr").length == 1) {
        current_tablePage -= 1;
    }
    $.post("http://localhost:" + location.port + "/admin/categories-api/delete-categories.php", { id: target_id, });

    $("#myModal_DeleteCategories").css("display", "none");
    // $('#myModal_DeleteSong').css("display", "none");
    $("#Add_alert").html("Đã xóa thành công");
    $("#Add_alert").show();
    $("#Add_alert").delay(2000).slideUp(200, function () {
        $("#Add_alert").hide(); // ẩn sau 3s
    });
    setTimeout(function () { getData() }, 20);

}
// edit categories
function edit_categories() {
    let categoriesValue = $("#Categories_value").html().split(","),
        Categories_name = $("#categories_name_edit").val(),
        Categories_topic = $("#topic_name_edit option:selected").text(),
        Categories_description = $("#Categories_description_edit").val(),
        Categories_singer = $("#Categories_singer_edit").val(),
        Categories_song = $("#Categories_song_edit").val(),
        error = 0;

    //bỏ phần tử rổng cuối mảng
    categoriesValue.pop();
    // chuyển các từ trong arr về chử thường
    let lower = categoriesValue.map(e => {
        return e.toLowerCase();
    });

    // error = Categories_song == "" ? 1 : error;
    error = Categories_singer == "" ? 2 : error;
    error = Categories_topic == "-- topic --" ? 3 : error;
    error = Categories_name == "" ? 4 : error;
    switch (error) {
        case 0:
            let Categories_name_topic = Categories_name + "_" + Categories_topic;
            console.log(Categories_name_topic)
            console.log(target_name_topic)
            if (lower.indexOf(Categories_name_topic.toLowerCase()) == -1 || target_name_topic == Categories_name_topic) {
                console.log("ok")
                $.post("http://localhost:" + location.port + "/admin/categories-api/update-categories.php",
                    {
                        id: target_id,
                        name: Categories_name,
                        topic: Categories_topic,
                        description: Categories_description,
                        singers: Categories_singer,
                        songs: Categories_song,
                    }
                );

                $("#myModal_EditCategories").css("display", "none")

                // // // xóa thông tin các ô vừa nhập
                $("#categories_name_edit").val("");
                $("#topic_name_edit").val(0);
                $("#Categories_description_edit").val("");
                $("#Categories_singe_editr").val("");
                $("#Categories_song_edit").val("");


                $("#Add_alert").html("Thay đổi thành công");
                $("#Add_alert").show();
                $("#Add_alert").delay(2000).slideUp(200, function () {
                    $("#Add_alert").hide(); // ẩn sau 3s
                });
                setTimeout(function () { getData() }, 20);




            } else {
                $("#edit_Error_Mess").html("chuyên mục này đã tồn tại trong topic " + Categories_topic);
                $("#categories_name_edit").css({ border: "1px solid red", });
                $("#categories_name_edit").focus();
                $("#edit_Error_Mess").css("visibility", "visible");
            }
            break
        // case 1:
        //     $("#edit_Error_Mess").html("Vui lòng nhập các bài hát");
        //     $("#Categories_song_edit").css({ border: "1px solid red", });
        //     $("#Categories_song_edit").focus();
        //     $("#edit_Error_Mess").css("visibility", "visible");
        //     break;
        case 2:
            $("#edit_Error_Mess").html("Vui lòng nhập tên ca sĩ");
            $("#Categories_singer_edit").css({ border: "1px solid red", });
            $("#Categories_singer_edit").focus();
            $("#edit_Error_Mess").css("visibility", "visible");
            break;
        case 3:
            $("#edit_Error_Mess").html("Vui lòng nhập chọn topic");
            $("#topic_name_edit").css({ border: "1px solid red", });
            $("#topic_name_edit").focus();
            $("#edit_Error_Mess").css("visibility", "visible");
            break;
        case 4:
            $("#edit_Error_Mess").html("Vui lòng nhập tên chuyên mục");
            $("#categories_name_edit").css({ border: "1px solid red", });
            $("#categories_name_edit").focus();
            $("#edit_Error_Mess").css("visibility", "visible");
            break;
    }
}
function Open_Dialog_Delete(id, name) {
    $("#deleteCategories_Name").html(name)
    target_id = id;
    $("#myModal_DeleteCategories").css("display", "flex")
}
function Open_Dialog_Edit(id, name, topic, description, singers, songs) {
    $("#categories_name_edit").val(name);
    $("#topic_name_edit option:selected").text(topic)
    $("#Categories_description_edit").val(description);
    $("#Categories_singer_edit").val(singers);
    $("#Categories_song_edit").val(songs);
    target_name_topic = name + '_' + topic
    target_id = id;
    $("#myModal_EditCategories").css("display", "flex")
}
function Open_Dialog_View(id, name, topic, follow, date, image, description, singers, songs) {
    let songValue, singerValue;
    songValue = songs.replaceAll(",", "\n")
    $("#categories_id_view").html(id);
    $("#categories_name_view").html(name);
    $("#categories_topic_view").html(topic);
    $("#categories_follow_view").html(follow);
    $("#categories_date_view").html(date);
    $("#categories_description_view").val(description);
    $("#categories_singers_view").val(singers);
    $("#categories_songs_view").val(songValue);
    $("#categories_image_view").html(image);
    $("#myModal_ViewCategories").css("display", "flex")

}

// sự kiện onchange search input
$(".CategoriesPage .container__header-with-search-input").on("input", function (e) {
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
// sự kiện click vào btn "Đầu" của table pagination
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
$(".CategoriesPage .container__header-with-search-input").click(function () {
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
$(".CategoriesPage .fa-magnifying-glass").click(function () {
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
// $("#myInputautocomplete-list").click(function () {
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

function autocomplete(inp, arr) {
    var currentFocus;

    inp.addEventListener("input", function (e) {
        var a,
            b,
            i,
            n = 0,
            val = this.value;

        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        $(".container__header-with-search-result").append(a);
        for (i = 0; i < arr.length; i++) {
            if (
                arr[i].substr(0, val.length).toUpperCase() ==
                val.toUpperCase() &&
                n < 5
            ) {
                b = document.createElement("DIV");
                b.innerHTML =
                    "<strong>" +
                    arr[i].substr(0, val.length) +
                    "</strong>" +
                    arr[i].substr(val.length) +
                    "<input type='hidden' value='" +
                    arr[i] +
                    "'>";

                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    SearchTable = [];
                    TableBody.forEach((i) => {
                        if (i.toLowerCase().indexOf(inp.value.toLowerCase()) > -1) {
                            SearchTable.push(i);
                        }
                    });
                    searchClick();
                    closeAllLists();
                });
                a.appendChild(b);
                n += 1;
            }
        }
    });

    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}    