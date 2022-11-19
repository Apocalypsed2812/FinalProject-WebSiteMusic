let TableBody,
    XIcon = $(".auth-form__header i.fa-xmark"),
    cancelSongForm = $(".auth-form__controls-back"),
    target_id,
    target_username,
    target_email;

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
    $(".header__item:nth-child(3)").addClass("header__item--active");
    // Lấy dữ liệu bài hát
    getData();
});
function getData() {
    $.get(
        "http://localhost:" + location.port + "/admin/users-api/get-user.php",
        function (data, status) {
            TableBody = [];
            let EmailValue = '', UsernameValue = '';
            data["data"].forEach((e) => {
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
            $("#table-User").html(TableBody);
            $("#Email_value").html(EmailValue);
            $("#Username_value").html(UsernameValue);
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
    console.log(id);
    console.log(username);
    console.log(email);
    console.log(role);
    console.log(gender);
    console.log(favoriteSong);
    console.log(recentlyListen);
    console.log(playlist);
    console.log(age);
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
    $.post("http://localhost:" + location.port + "/admin/users-api/delete-user.php", { id: target_id, });


    getData();
    $("#myModal_DeleteUser").css("display", "none");
    // $('#myModal_DeleteSong').css("display", "none");
    $("#User_alert").html("Đã xóa thành công");
    $("#User_alert").show();
    $("#User_alert")
        .delay(2000)
        .slideUp(200, function () {
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