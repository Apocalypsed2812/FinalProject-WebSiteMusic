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
            let endNum = current_tablePage * 5,
                beginNum = endNum - 5,
                tableDisplay = "",
                pageAmount = Math.ceil(data["data"].length / 5),
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
            $("#Table_categories").html(Table_NumHtml);
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
        error = 0;
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

    error = Categories_song == "" ? 1 : error;
    error = Categories_singer == "" ? 2 : error;
    error = Categories_topic == "-- topic --" ? 3 : error;
    error = Categories_name == "" ? 4 : error;
    switch (error) {
        case 0:
            let Categories_name_topic = Categories_name + "_" + Categories_topic;
            if (lower.indexOf(Categories_name_topic.toLowerCase()) == -1) {
                $("#myAddCategoriesForm").ajaxForm({
                    complete: function (xhr) {
                        if (xhr.responseText) {
                            $i = xhr.responseText.split("\n");
                            $("#Add_Error_Mess").html($i[$i.length - 1]);
                            $("#Add_Error_Mess").css("visibility", "visible");
                            error = 1;
                        } else {
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

                            getData();

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
                            getData();
                        }
                        getData();
                    },
                });

            } else {
                $("#Add_Error_Mess").html("chuyên mục này đã tồn tại trong topic " + Categories_topic);
                $("#categories_add").css({ border: "1px solid red", });
                $("#categories_add").focus();
                $("#Add_Error_Mess").css("visibility", "visible");
            }
            break
        case 1:
            $("#Add_Error_Mess").html("Vui lòng nhập các bài hát");
            $("#Categories_song").css({ border: "1px solid red", });
            $("#Categories_song").focus();
            $("#Add_Error_Mess").css("visibility", "visible");
            break;
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
    }


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
    getData();
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

    error = Categories_song == "" ? 1 : error;
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

                getData();
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
                getData();




            } else {
                $("#edit_Error_Mess").html("chuyên mục này đã tồn tại trong topic " + Categories_topic);
                $("#categories_name_edit").css({ border: "1px solid red", });
                $("#categories_name_edit").focus();
                $("#edit_Error_Mess").css("visibility", "visible");
            }
            break
        case 1:
            $("#edit_Error_Mess").html("Vui lòng nhập các bài hát");
            $("#Categories_song_edit").css({ border: "1px solid red", });
            $("#Categories_song_edit").focus();
            $("#edit_Error_Mess").css("visibility", "visible");
            break;
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
    $("#categories_id").html(id);
    $("#categories_name").html(name);
    $("#categories_topic").html(topic);
    $("#categories_follow").html(follow);
    $("#categories_date").html(date);
    $("#categories_description").val(description);
    $("#categories_singers").val(singers);
    $("#categories_songs").val(songValue);
    $("#categories_image").html(image);
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

//Pagination_click
function Pagination_click(e, table) {
    table_page = $(".admin__song-pagination-list li a");
    table_page.removeClass("admin__song-pagination-link--active");
    $("a", e).addClass("admin__song-pagination-link--active");
    current_tablePage = $(e).text();
    let endNum = current_tablePage * 5,
        beginNum = endNum - 5,
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
        endNum = current_tablePage * 5,
        beginNum = endNum - 5,
        tableDisplay = "",
        currentTable = "",
        active;
    if (search.val() != "") {
        pageAmount = Math.ceil(SearchTable.length / 5);
        for (let i = beginNum; i < endNum; i++) {
            tableDisplay += SearchTable[i];
        }
        currentTable = `Search`;
    } else {
        pageAmount = Math.ceil(TableBody.length / 5);
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