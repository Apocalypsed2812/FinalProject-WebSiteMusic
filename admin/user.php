<?php
require('../db.php');
session_start();
if (!$_SESSION['isLogin']) {
    header('Location: ../login.php');
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zing MP3</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/admin.css">
    <link rel="stylesheet" href="../assets/fonts/fontawesome-free-6.1.1-web/css/all.min.css">
</head>

<body class="AdminPage UserPage">
    <div class="app">
        <?php
        require_once('../includes/Sidebar/SidebarAdmin.php')
        ?>
        <div class="container">
            <?php
            require_once('../includes/Header/HeaderAdmin.php')
            ?>
            <div class="grid wide container-tablet container-mobile">
                <div class="row mt-110">
                    <div class="col l-12 PageTitle" id="title_home">
                        <span class="new__music-title">
                            Thông tin người dùng
                        </span>
                        <div class="sortDiv">

                            <span id="sortTitle">Sắp xếp theo:</span>
                            <select name="SortList" id="SortList">
                                <option value="id">Id</option>
                                <option value="username">Tên</option>
                                <option value="age">Tuổi</option>
                                <option value="gender">Giới tính</option>
                            </select>
                            <div id="Icon_arrow_up"><i class="fa-solid fa-arrow-up"></i></div>
                            <div id="Icon_arrow_down"><i class="fa-solid fa-arrow-down"></i></div>
                        </div>
                        <span class="alert_admin" id="User_alert">ADD Successful</span>
                    </div>
                </div>
                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12 admin__song">
                        <table border="1" class="tableSong">
                            <thead class="tableHead">
                                <tr>
                                    <th style="width:10%">ID</th>
                                    <th>Tên</th>
                                    <th style="width:15%">Tuổi</th>
                                    <th style="width:15%">Giới tính</th>
                                    <th style="width:20%">Action</th>
                                    <th id="Email_value" style="display: none;">a</th>
                                    <th id="Username_value" style="display: none;">a</th>
                                    <th id="UserSearch_value" style="display: none;">a</th>
                                </tr>
                            </thead>
                            <tbody class="" id="table-body">

                            </tbody>
                        </table>
                        <p class="NullValue" style="display: none;">Không có dữ liệu</p>
                    </div>
                </div>

                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12">
                        <ul class="admin__song-pagination-list" id="Table_pagination">
                            <li class="admin__song-pagination-item">
                                <a href="" class="admin__song-pagination-link admin__song-pagination-link--active">1</a>
                            </li>
                            <li class="admin__song-pagination-item">
                                <a href="" class="admin__song-pagination-link">2</a>
                            </li>
                            <li class="admin__song-pagination-item">
                                <a href="" class="admin__song-pagination-link">3</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Modal Delete-->
    <div class="modal modal-add-song" id="myModal_DeleteUser">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Xóa User</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <p>Bạn muốn xóa User <b id="deleteUser_Name"></b> ?</p>

                    <div class="auth-form__controls auth-form__controls-add">
                        <button type="button" id="btn-close-delete-user" class="btn auth-form__controls-back btn--normal btn-close-add-staff">Hủy</button>
                        <button type="submit" id="btn-submit-delete-user" onclick="delete_user()" class="btn btn--primary btn-add-staff">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal edit user -->
    <div class="modal modal-add-song" id="myModal_EditUser">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Sửa thông tin user</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <form id="myEditUserForm" action="#">
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <label class="add-form_label" for="user_id_edit">ID user</label>
                                <input readonly type="text" class="add-form_input EditForm_IdInput" name="user_id" id="user_id_edit">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="user_username_edit">Tên tài khoản</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập tên bài hát" name="user_name" id="user_username_edit">
                            </div>

                            <div class="auth-form__group">
                                <label class="add-form_label" for="user_age_edit">Tuổi</label>
                                <input type="number" class="add-form_input" placeholder="Vui lòng nhập tuổi" name="user_Age" id="user_age_edit">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="user_gender_edit">Giới tính</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập giới tính" name="user_gender" id="user_gender_edit">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="user_email_edit">Email</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập email" name="user_email" id="user_email_edit">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="user_role_edit">Role</label>
                                <!-- <input type="text" class="add-form_input" placeholder="Vui lòng nhập role" name="user_role" id="user_role_edit"> -->
                                <select class="add-form_input" name="user_role" id="user_role_edit">
                                    <option value=1>admin</option>
                                    <option value=2>user</option>
                                </select>
                            </div>
                            <span class="Error_Mess" id="User_edit_Error_Mess">Error messageas</span>

                        </div>
                        <div class="auth-form__controls auth-form__controls-edit">

                            <button type="button" id="btn-close-edit-user" class="btn auth-form__controls-back btn--normal btn-close-edit-staff">Hủy</button>
                            <button type="button" id="btn-submit-edit-user" onclick="edit_user()" class="btn btn--primary btn-edit-staff">Sửa</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal view user -->
    <div class="modal modal-add-song" id="myModal_ViewUser">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Thông tin User</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <form id="myViewUserForm" class="ViewForm" action="#">
                        <div class="add-form_input">
                            <b>ID</b>
                            <span id="viewUser_id">12</span>
                        </div>
                        <div class="add-form_input">
                            <b>Tên User</b>
                            <span id="viewUser_username">USER A</span>
                        </div>
                        <div class="add-form_input">
                            <b>Email</b>
                            <span id="viewUser_email">Email@email.com</span>
                        </div>

                        <div class="add-form_input">
                            <b>Giới tính</b>
                            <span id="viewUser_gender">Nam</span>
                        </div>
                        <div class="add-form_input">
                            <b>Tuổi</b>
                            <span id="viewUser_age">55</span>
                        </div>
                        <div class="add-form_input">
                            <b>Role</b>
                            <span id="viewUser_role">User</span>
                        </div>
                        <div class="add-form_input">
                            <b>Yêu thích</b>
                            <span id="viewUser_favoriteSong">Pop, rock</span>
                        </div>
                        <div class="add-form_input">
                            <b>Nghe gần đây</b>
                            <span id="viewUser_recentlyListen">bài a, bài b</span>
                        </div>
                        <div class="add-form_input">
                            <b>Playlist</b>
                            <span id="viewUser_playlist">PlaylistA, playlistB</span>
                        </div>

                        <div class="auth-form__controls auth-form__controls-edit">
                            <button type="button" id="btn-close-view-user" class="btn auth-form__controls-back btn--normal btn-close-edit-staff">Đóng</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="../assets/js/admin_user.js"></script>

</html>