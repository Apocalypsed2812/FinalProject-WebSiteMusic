let addBtn = $(".admin__song-btn button"),
    XIcon = $(".auth-form__header i.fa-xmark"),
    cancelSongForm = $(".auth-form__controls-back"),
    table_page1 = $(".admin__song-pagination-list li:first-child a"),
    search = $(".HomePage .container__header-with-search-input"),
    table_page, target_id, target_name,
    TableBody, SearchTable, Suggestions, pageAmount,
    endNum, beginNum, isFirst, First,
    tablePageDisplay, Last,
    Table_NumHtml, active,
    tableDisplay = "",
    current_tablePage = 1;


// sau khi trang tải xong
$(document).ready(function () {
    // Add active cho sidebar
    $(".header__item:nth-child(3)").addClass("header__item--active");
    // Lấy dữ liệu bài hát
    getData();
    // lấy danh sách các thể loại bài hát
    get_song_category();
});
// Lấy các thể loại cho vào select khi thêm bài hát
function get_song_category() {
    let category = `<option value=0>-- Thể loại --</option>`,
        n = 1;
    $.get(
        "http://localhost:" + location.port + "/admin/songs-api/get-category.php",
        function (data, status) {
            data["data"].forEach((e) => {
                category += `<option value=` + n + `>` + e["name"] + `</option>`;
            });
            $(".song_category_list").html(category);
        },
        "json"
    );
}
// sự kiện click vào btn "Đầu" của table pagination
function FirstPagination_click(e, table) {
    tableDisplay = "";
    Table_NumHtml = "";
    current_tablePage = 1;
    beginNum = 0;
    endNum = 8;
    Pagination(table);
}
// sự kiện click vào btn "Cuối" của table pagination
function LastPagination_click(e, table) {
    tableDisplay = "";
    Table_NumHtml = "";
    current_tablePage = Math.ceil((table == "Main" ? TableBody.length : SearchTable.length) / 8);
    endNum = pageAmount * 8;
    beginNum = endNum - 8;
    Pagination(table);
}
// sự kiện table pagination click
function Pagination_click(e, table) {
    current_tablePage = $(e).text();
    endNum = current_tablePage * 8;
    beginNum = endNum - 8;
    tableDisplay = "";
    Table_NumHtml = "";
    Pagination(table);
}
function Pagination(table) {
    if (table == "Main") {
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += TableBody[i];
        }
        pageAmount = Math.ceil(TableBody.length / 8);
    } else {
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += SearchTable[i];
        }
        pageAmount = Math.ceil(SearchTable.length / 8);
    }
    current_tablePage = parseInt(current_tablePage);

    switch (pageAmount) {
        case 1:
            First = 1;
            Last = 1;
            break;
        case 2:
            First = 1;
            Last = 2;
            break;
        default:
            isFirst = current_tablePage == 1 ? 1 : current_tablePage - 1;
            First = current_tablePage == pageAmount ? current_tablePage - 2 : isFirst;
            tablePageDisplay = isFirst == 1 ? 3 : current_tablePage + 1;
            Last = current_tablePage == pageAmount ? current_tablePage : tablePageDisplay;
    }

    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="FirstPagination_click($(this),`' +
        table +
        '`)">' +
        '<a class="admin__song-pagination-link Firstpagination"> Đầu </a></li>';
    for (let j = First; j <= Last; j++) {
        active = j == current_tablePage ? "admin__song-pagination-link--active" : "";
        Table_NumHtml +=
            '<li class="admin__song-pagination-item" onclick="Pagination_click($(this),`' +
            table +
            '`)">' +
            '<a class="admin__song-pagination-link ' +
            active +
            '">' +
            j +
            "</a></li>";
    }
    Table_NumHtml +=
        '<li class="admin__song-pagination-item" onclick="LastPagination_click($(this),`' +
        table +
        '`)">' +
        '<a class="admin__song-pagination-link Lastpagination"> Cuối </a></li>';
    $("#Table_pagination").html(Table_NumHtml);
    $("#table-body").html(tableDisplay);
}

// đổi màu border và ẩn thông báo lỗi
//form Add
$(".add-form_input").click(function () {
    $(".add-form_input").css({ border: "1px solid #dbdbdb" });
    $("#Add_Error_Mess").css("visibility", "hidden");
});

// sự kiện click nút "thêm bài hát"
addBtn.click(function () {
    $("#myModal_AddSong").css("display", "flex");
});

// nút 'X' và 'hủy' => đóng form và xóa các dữ liệu trong form
function deleteInput() {
    $(".modal").css("display", "none");
    $(".song_category_list").val(0).change();
    $("#song_name_add_song").val("");
    $("#song_singer_add_song").val("");
    $("#song_category_add").val(0).change();
    $("#song_nation_add").val(0).change();
    $("#song_Lyric_add_song").val("");
    $("#song_files_add_song").val("");
    $("#song_image_add").val("");
    $("#Add_Error_Mess").css("visibility", "hidden");
    $("#edit_Error_Mess").css("visibility", "hidden");
    $(".add-form_input").css({ border: "1px solid #dbdbdb" });
}

XIcon.click(function () {
    deleteInput();
});

cancelSongForm.click(function () {
    deleteInput();
});
// hàm lấy dữ liệu db chèn vào table
function getData() {
    let Suggestions = "";
    $.get(
        "http://localhost:" + location.port + "/admin/songs-api/get-song.php",
        function (data, status) {
            TableBody = [];
            let Song_Singer_Category = "";

            data["data"].forEach((e) => {
                Song_Singer_Category += e["name"] + "_" + e["singer"] + "_" + e["category"] + ";";
                if (Suggestions.indexOf($.trim(e["name"])) == -1) {
                    Suggestions += $.trim(e["name"]) + ",";
                }
                for (let i = 0; i < e["singer"].split(",").length; i++) {
                    let singer = e["singer"].split(",")[i];
                    if (Suggestions.indexOf($.trim(singer)) == -1) {
                        Suggestions += $.trim(singer) + ",";
                    }
                }

                TableBody.push(
                    `<tr><td>${e["id"]}</td><td>${e["name"]}</td><td>${e["singer"]}</td><td>${e["listens"]}</td><td>${e["comments"]}</td><td> <i class="fa-solid fa-eye" onclick="Open_Dialog_View(${e["id"]}, '${e["name"]}', '${e["singer"]}', '${e["date"]}', '${e["category"]}', '${e["nation"]}', \`${e["lyric"]}\`, '${e["listens"]}', '${e["comments"]}', '${e["downloads"]}', '${e["file"]}')\"></i><i class="fa-solid fa-trash-can" onclick="Open_Dialog_Delete(${e["id"]}, '${e["name"]}')\"></i><i class="fa-solid fa-pen-to-square" onclick="Open_Dialog_Edit(${e["id"]}, '${e["name"]}', '${e["singer"]}', '${e["category"]}', '${e["nation"]}', \`${e["lyric"]}\`)"></i></td><td style="display: none">${e["category"]}</td><td style="display: none">${e["lyric"]}</td><td style="display: none">${e["file"]}</td></tr>`
                );
            });
            endNum = current_tablePage * 8;
            beginNum = endNum - 8;
            tableDisplay = "";
            Table_NumHtml = "";
            pageAmount = Math.ceil(data["data"].length / 8);
            current_tablePage = parseInt(current_tablePage);
            Pagination("Main");

            $("#Search_value").html(Suggestions);
            $("#Song_Singer_Category").html(Song_Singer_Category.replaceAll("amp;", ""));
        },
        "json"
    );
}

//hàm thêm bài hát
function add_song() {
    let nameBox = $("#song_name_add_song").val(),
        singer = $("#song_singer_add_song").val(),
        category = $("#song_category_add :selected").text(),
        nation = $("#song_nation_add :selected").text(),
        lyric = $("#song_Lyric_add_song").val(),
        current_time = new Date(),
        Song_Singer_Category = $("#Song_Singer_Category").html().toLowerCase().replaceAll("amp;", "").split(";"),
        NSC = nameBox + "_" + singer + "_" + category;

    Song_Singer_Category.pop();
    NSC = NSC.toLocaleLowerCase();
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

    try {
        song = $("#song_files_add_song").get(0).files[0].name;
    } catch (error) {
        song = "";
    }
    try {
        image = $("#song_image_add").get(0).files[0].name;
    } catch (error) {
        image = "";
    }

    $("#myForm").ajaxForm({
        complete: function (xhr) {
            if (nameBox == "" || singer == "" || category == "-- Thể loại --" || nation == "-- Quốc gia --") {
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
                } else if (category == "-- Thể loại --") {
                    $("#Add_Error_Mess").html("Vui lòng nhập thể loại nhạc");
                    $("#song_category_add").css({
                        border: "1px solid red",
                    });
                    $("#song_category_add").focus();
                } else if (nation == "-- Quốc gia --") {
                    $("#Add_Error_Mess").html("Vui lòng nhập Quốc gia");
                    $("#song_nation_add").css({
                        border: "1px solid red",
                    });
                    $("#song_nation_add").focus();
                }
                $("#Add_Error_Mess").css("visibility", "visible");
            } else {
                if (xhr.responseText) {
                    $i = xhr.responseText.split("\n");
                    $("#Add_Error_Mess").html($i[$i.length - 1]);
                    $("#Add_Error_Mess").css("visibility", "visible");
                } else {
                    if (Song_Singer_Category.indexOf(NSC) == -1) {
                        $.post("http://localhost:" + location.port + "/admin/songs-api/add-song.php", {
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
                            image: image,
                        });
                        $("#myModal_AddSong").css("display", "none");

                        // // xóa thông tin các ô vừa nhập
                        $("#song_name_add_song").val("");
                        $("#song_singer_add_song").val("");
                        $("#song_category_add").val(0).change();
                        $("#song_nation_add").val(0).change();
                        $("#song_Lyric_add_song").val("");
                        $("#song_files_add_song").val("");
                        $("#song_image_add").val("");

                        // // hiện thông báo thành công
                        $("#Add_alert").html("Đã thêm thành công");
                        $("#Add_alert").show();
                        $("#Add_alert")
                            .delay(2000)
                            .slideUp(200, function () {
                                $("#Add_alert").hide(); // ẩn sau 3s
                            });
                        setTimeout(function () {
                            getData();
                        }, 20);
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
    $("#myModal_DeleteSong").css("display", "flex");
    target_id = id;
    $("#deleteSong_Name").html(name);
}

// Mở dialog edit bài hát
function Open_Dialog_Edit(id, name, singer, category, nation, lyric) {
    $("#song_id_edit_song").val(id);
    $("#song_name_edit_song").val(name);
    $("#song_singer_edit_song").val(singer);
    $("#song_category_edit :selected").text(category);
    $("#song_nation_edit :selected").text(nation);
    $("#song_lyric_edit_song").val(lyric);
    $("#myModal_EditSong").css("display", "flex");
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
    $("#myModal_ViewSong").css("display", "flex");
}
//Hàm xóa bài hát
function delete_song() {
    if ($("#table-body tr").length == 1) {
        current_tablePage -= 1;
    }
    $.post("http://localhost:" + location.port + "/admin/songs-api/delete-song.php", { id: target_id });

    $("#myModal_DeleteSong").css("display", "none");
    $("#Add_alert").html("Đã xóa thành công");
    $("#Add_alert").show();
    $("#Add_alert")
        .delay(2000)
        .slideUp(200, function () {
            $("#Add_alert").hide(); // ẩn sau 3s
        });
    setTimeout(function () {
        getData();
    }, 50);
}
// hàm sửa thông tin bài hát
function edit_song() {
    target_id = $("#song_id_edit_song").val();
    nameBox = $("#song_name_edit_song").val();
    singer = $("#song_singer_edit_song").val();
    category = $("#song_category_edit :selected").text();
    nation = $("#song_nation_edit :selected").text();
    lyric = $("#song_lyric_edit_song").val();

    if (nameBox == "" || singer == "" || category == "-- Thể loại --" || nation == "-- Quốc gia --") {
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
        } else if (category == "-- Thể loại --") {
            $("#edit_Error_Mess").html("Vui lòng nhập thể loại nhạc");
            $("#song_category_edit").css({
                border: "1px solid red",
            });
            $("#song_category_edit").focus();
        } else if (nation == "-- Quốc gia --") {
            $("#edit_Error_Mess").html("Vui lòng nhập thể loại nhạc");
            $("#song_nation_edit").css({
                border: "1px solid red",
            });
            $("#song_nation_edit").focus();
        }
        $("#edit_Error_Mess").css("visibility", "visible");
    } else {
        $.post("http://localhost:" + location.port + "/admin/songs-api/update-song.php", {
            id: target_id,
            name: nameBox,
            singer: singer,
            category: category,
            nation: nation,
            lyric: lyric,
        });
        $("#myModal_EditSong").css("display", "none");

        // // hiện thông báo thành công
        $("#Add_alert").html("Thay đổi thành công");
        $("#Add_alert").show();
        $("#Add_alert")
            .delay(2000)
            .slideUp(200, function () {
                $("#Add_alert").hide(); // ẩn sau 3s
            });
        setTimeout(function () {
            getData();
        }, 20);
    }
}

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
});

//search input click
$(".HomePage .container__header-with-search-input").click(function () {
    Suggestions = $("#Search_value").html().split(",");
    Suggestions.pop();
    autocomplete(document.getElementById("myInput"), Suggestions);
});

$("body").click(function (e) {
    if (
        e.target.className != "container__header-with-search-result" &&
        e.target.className != "container__header-with-search-input"
    ) {
        $(".container__header-with-search-result").css("visibility", "hidden");
    }
});

// nút search icon click
$(".HomePage .fa-magnifying-glass").click(function () {
    $(".NullValue").css("display", "none");
    SearchTable = [];
    TableBody.forEach((i) => {
        if (i.toLowerCase().indexOf(search.val().toLowerCase()) > -1) {
            SearchTable.push(i);
        }
    });
    searchClick();
});
// function search
function searchClick() {
    current_tablePage = 1;
    Table_NumHtml = "";
    endNum = current_tablePage * 8;
    beginNum = endNum - 8;
    tableDisplay = "";
    currentTable = "";

    if (search.val() != "") {
        Pagination("Search");
    } else {
        Pagination("Main");
    }

    if (tableDisplay.indexOf("undefined") == 0) {
        $("#table-body").html("");
        $(".NullValue").css("display", "block");
    }
}
// function tạo gợi ý
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
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase() && n < 5) {
                b = document.createElement("DIV");
                b.innerHTML =
                    "<strong>" +
                    arr[i].substr(0, val.length) +
                    "</strong>" +
                    arr[i].substr(val.length) +
                    "<input type='hidden' value='" +
                    arr[i] +
                    "'>";

                // click các gợi ý trong  - 'Đề xuất cho bạn'
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
// Sort
$("#Icon_arrow_down").click(function () {
    $("#Icon_arrow_down").css("display", "none");
    $("#Icon_arrow_up").css("display", "inline-block");
    Sort();
});
$("#Icon_arrow_up").click(function () {
    $("#Icon_arrow_up").css("display", "none");
    $("#Icon_arrow_down").css("display", "inline-block");
    Sort();
});
$("#SortList").change(function () {
    Sort();
});
function Sort() {
    let sortOption = $("#SortList").find(":selected").val(),
        ASC = $("#Icon_arrow_up").css("display") == "inline-block" ? "ASC" : "DESC";
    let sql = "SELECT * FROM `songs` ORDER BY `" + sortOption + "` " + ASC;

    $.get(
        "http://localhost:" + location.port + "/admin/songs-api/sort-song.php",
        {
            sql: sql,
        },
        function (data, status) {
            TableBody = [];

            data["data"].forEach((e) => {
                TableBody.push(
                    `<tr><td>${e["id"]}</td><td>${e["name"]}</td><td>${e["singer"]}</td><td>${e["listens"]}</td><td>${e["comments"]}</td><td> <i class="fa-solid fa-eye" onclick="Open_Dialog_View(${e["id"]}, '${e["name"]}', '${e["singer"]}', '${e["date"]}', '${e["category"]}', '${e["nation"]}', \`${e["lyric"]}\`, '${e["listens"]}', '${e["comments"]}', '${e["downloads"]}', '${e["file"]}')\"></i><i class="fa-solid fa-trash-can" onclick="Open_Dialog_Delete(${e["id"]}, '${e["name"]}')\"></i><i class="fa-solid fa-pen-to-square" onclick="Open_Dialog_Edit(${e["id"]}, '${e["name"]}', '${e["singer"]}', '${e["category"]}', '${e["nation"]}', \`${e["lyric"]}\`)"></i></td><td style="display: none">${e["category"]}</td><td style="display: none">${e["lyric"]}</td><td style="display: none">${e["file"]}</td></tr>`
                );
            });
            endNum = current_tablePage * 8;
            beginNum = endNum - 8;
            tableDisplay = "";
            Table_NumHtml = "";
            pageAmount = Math.ceil(data["data"].length / 8);
            current_tablePage = parseInt(current_tablePage);
            Pagination("Main");

            if (search.val() != "") {
                SearchTable = [];
                TableBody.forEach((i) => {
                    if (i.toLowerCase().indexOf(search.val().toLowerCase()) > -1) {
                        SearchTable.push(i);
                    }
                });
                searchClick();
            }
        },
        "json"
    );
}
