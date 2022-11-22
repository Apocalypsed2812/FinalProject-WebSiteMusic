let TableBody,
    XIcon = $(".auth-form__header i.fa-xmark"),
    cancelSongForm = $(".auth-form__controls-back"),
    target_id,
    target_username,
    target_email,
    current_tablePage = 1,
    Suggestions,
    search = $(".UserPage .container__header-with-search-input");

// nút 'X' và 'hủy' => đóng form
XIcon.click(function () {
    $(".modal").css("display", "none");
    $("input[type='text']").css({
        border: "1px solid #dbdbdb",
    });
    $("#User_edit_Error_Mess").css("visibility", "hidden");
});
cancelSongForm.click(function () {
    $(".modal").css("display", "none");
    $("input[type='text']").css({
        border: "1px solid #dbdbdb",
    });
    $("#User_edit_Error_Mess").css("visibility", "hidden");
});

// sự kiện onchange search input
$(".UserPage .container__header-with-search-input").on("input", function (e) {
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

// đổi màu border và ẩn thông báo lỗi
//form Edit
$("#myModal_EditUser input[type='text']").click(function () {
    $("#myModal_EditUser input[type='text']").css({
        border: "1px solid #dbdbdb",
    });
    $("#User_edit_Error_Mess").css("visibility", "hidden");
});

$(document).ready(function () {
    // Add active cho sidebar
    $(".header__item:nth-child(4)").addClass("header__item--active");
    // Lấy dữ liệu bài hát
    getData();
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

    $("#table-User").html(tableDisplay);
}

//search input click
$(".UserPage .container__header-with-search-input").click(function () {
    Suggestions = $("#UserSearch_value").html().split(",");
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
$(".UserPage .fa-magnifying-glass").click(function () {
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
    $("#UserTable_pagination").html(Table_NumHtml);
    if (tableDisplay.indexOf("undefined") != 0) {
        $("#table-User").html(tableDisplay);
    } else {
        $("#table-User").html("");
        $(".NullValue").css("display", "block")

    }
}
function getData() {
    let Suggestions = "";
    $.get(
        "http://localhost:" + location.port + "/admin/users-api/get-user.php",
        function (data, status) {
            TableBody = [];
            let EmailValue = '', UsernameValue = '';

            data["data"].forEach((e) => {
                if (Suggestions.indexOf(e["username"]) == -1) {
                    Suggestions += e["username"] + ",";
                }
                let arr = [e["id"], e["username"], e["email"], e["role"], e["gender"], e["favoriteSong"], e["recentlyListen"], e["playlist"], e["age"]]
                TableBody.push(
                    "<tr><td>" + e["id"] + "</td><td>" + e["username"] + "</td><td>" +
                    e["age"] + "</td><td>" +
                    e["gender"] +
                    "</td><td> " +
                    '<i class="fa-solid fa-eye" onclick="Open_Dialog_View(' +
                    e["id"] + ", '" + e["username"] + "'" + ", '" + e["email"] + "'" + ", '" + e["role"] + "'" + ", '" + e["gender"] + "'" + ", '" +
                    e["favoriteSong"] + "'" + ", '" + e["recentlyListen"] + "'" + ", '" + e["playlist"] + "'" + ", '" + e["age"] + "')\"></i>" +
                    '<i class="fa-solid fa-trash-can" onclick="Open_Dialog_Delete(' + e["id"] + ", '" + e["username"] + "')\"></i>" +
                    '<i class="fa-solid fa-pen-to-square" onclick="Open_Dialog_Edit(' +
                    e["id"] + ", '" + e["username"] + "'" + ", '" + e["email"] + "'" + ", '" + e["role"] + "'" + ", '" + e["gender"] + "'" + ", '" +
                    e["age"] + "')\"></i>" +

                    "</td><td style='display:none'>" +
                    e["email"] +
                    "</td><td style='display:none'>" +
                    e["role"] +
                    "</td><td style='display:none'>" +
                    e["favoriteSong"] +
                    "</td><td style='display:none'>" +
                    e["recentlyListen"] +
                    "</td><td style='display:none'>" +
                    e["playlist"] +
                    "</td></tr>"
                );
                EmailValue += e["email"] + ",";
                UsernameValue += e["username"] + ",";
            });
            let endNum = current_tablePage * 5,
                beginNum = endNum - 5,
                tableDisplay = "",
                pageAmount = Math.ceil(data["data"].length / 5),
                Table_NumHtml = "",
                active;
            console.log(endNum)
            console.log(beginNum)
            console.log(pageAmount)

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
            $("#UserTable_pagination").html(Table_NumHtml);
            for (let i = beginNum; i < endNum; i++) {
                tableDisplay += TableBody[i];
            }
            $("#table-User").html(tableDisplay);
            $("#Email_value").html(EmailValue);
            $("#Username_value").html(UsernameValue);
            $("#UserSearch_value").html(Suggestions);

        },
        "json"
    );
}
function Open_Dialog_Delete(id, name) {
    target_id = id;
    $("#deleteUser_Name").html(name);
    $("#myModal_DeleteUser").css("display", "flex");
}
function Open_Dialog_Edit(id, username, email, role, gender, age) {
    $("#user_id_edit").val(id);
    $("#user_username_edit").val(username);
    $("#user_email_edit").val(email);
    $("#user_gender_edit").val(gender);
    let userRole = role == "admin" ? 1 : 2
    $("#user_role_edit").val(userRole);
    $("#user_age_edit").val(age);
    target_username = username
    target_email = email
    $("#myModal_EditUser").css("display", "flex");
}
function Open_Dialog_View(id, username, email, role, gender, favoriteSong, recentlyListen, playlist, age) {
    $("#viewUser_id").html(id);
    $("#viewUser_username").html(username);
    $("#viewUser_email").html(email);
    $("#viewUser_gender").html(gender);
    $("#viewUser_age").html(age);
    $("#viewUser_role").html(role);
    $("#viewUser_favoriteSong").html(favoriteSong);
    $("#viewUser_recentlyListen").html(recentlyListen);
    $("#viewUser_playlist").html(playlist);
    $("#myModal_ViewUser").css("display", "flex");
}
function delete_user() {
    if ($("#table-User tr").length == 1) {
        current_tablePage -= 1;
    }
    $.post("http://localhost:" + location.port + "/admin/users-api/delete-user.php", { id: target_id, });


    getData();
    $("#myModal_DeleteUser").css("display", "none");
    // $('#myModal_DeleteSong').css("display", "none");
    $("#User_alert").html("Đã xóa thành công");
    $("#User_alert").show();
    $("#User_alert").delay(2000).slideUp(200, function () {
        $("#User_alert").hide(); // ẩn sau 3s
    });
    getData();
}
function edit_user() {
    target_id = $("#user_id_edit").val();
    let nameBox = $("#user_username_edit").val(),
        emailbox = $("#user_email_edit").val(),
        genderBox = $("#user_gender_edit").val(),
        roleBox = $("#user_role_edit option:selected").text(),
        ageBox = $("#user_age_edit").val(),
        AllEmail, AllUsername,
        error = 0;
    if (target_email != emailbox) {
        AllEmail = $("#Email_value").html().split(",");
        AllEmail.pop();

        if (AllEmail.indexOf(emailbox) > -1) {
            error = 1;
        }
    }

    if (target_username != nameBox) {
        AllUsername = $("#Username_value").html().split(",");
        AllUsername.pop();
        if (AllUsername.indexOf(nameBox) > -1) {
            error = 2;
        }
    }
    switch (error) {
        case 1:
            $("#User_edit_Error_Mess").css("visibility", "visible");
            $("#User_edit_Error_Mess").html("Email đã tồn tại");
            $("#user_email_edit").css({
                border: "1px solid red"
            });
            break;
        case 2:
            $("#User_edit_Error_Mess").css("visibility", "visible");
            $("#User_edit_Error_Mess").html("Tài khoản đã tồn tại");
            $("#user_username_edit").css({
                border: "1px solid red"
            });
            break;

        case 0:
            $.post("http://localhost:" + location.port + "/admin/users-api/update-user.php",
                {
                    id: target_id,
                    username: nameBox,
                    email: emailbox,
                    role: roleBox,
                    gender: genderBox,
                    age: ageBox
                });


            getData();
            $("#myModal_EditUser").css("display", "none");
            // $('#myModal_DeleteSong').css("display", "none");
            $("#User_alert").html("Cập nhật thành công");
            $("#User_alert").show();
            $("#User_alert")
                .delay(2000)
                .slideUp(200, function () {
                    $("#User_alert").hide(); // ẩn sau 3s
                });
            getData();
            break;
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
