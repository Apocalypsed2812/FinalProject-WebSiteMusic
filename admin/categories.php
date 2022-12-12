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

<body class="AdminPage CategoriesPage">
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
                    <div class="col l-12 PageTitle" id="title_categories">
                        <span class="new__music-title">
                            Thông tin chuyên mục
                        </span>
                        <div class="sortDiv">

                            <span id="sortTitle">Sắp xếp theo:</span>
                            <select name="SortList" id="SortList">
                                <option value="id">Id</option>
                                <option value="name">Tên chuyên mục</option>
                                <option value="topic">Topic</option>
                                <option value="follow">Lượt thích</option>
                                <option value="date">Ngày tạo</option>
                            </select>
                            <div id="Icon_arrow_up"><i class="fa-solid fa-arrow-up"></i></div>
                            <div id="Icon_arrow_down"><i class="fa-solid fa-arrow-down"></i></div>
                        </div>
                        <span class="alert_admin" id="Add_alert">ADD Successful</span>
                    </div>
                </div>
                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12 admin__song">
                        <table border="1" class="tableSong">
                            <thead class="tableHead">
                                <tr>
                                    <th style="width:5%">ID</th>
                                    <th style="width:23%">Tên chuyên mục</th>
                                    <th style="width:23%">Topic</th>
                                    <th style="width:10%">Lượt thích</th>
                                    <th style="width:10%">Bài hát</th>
                                    <th style="width:17%">Ngày tạo</th>
                                    <th style="width:12%">Action</th>
                                    <th id="Search_value" style="display: none;">a</th>
                                    <th id="Categories_value" style="display: none;">a</th>
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
                            <li class="admin__song-pagination-item" onclick="Pagination_click($(this))">
                                <a class="admin__song-pagination-link">1</a>
                            </li>
                            <li class="admin__song-pagination-item" onclick="Pagination_click($(this))">
                                <a class="admin__song-pagination-link">2</a>
                            </li>
                            <li class="admin__song-pagination-item" onclick="Pagination_click($(this))">
                                <a class="admin__song-pagination-link">3</a>
                            </li>
                        </ul>
                    </div>
                    <!-- <div class="col l-12 m-12 c-12">
                        <div class="admin__song-btn">
                            <button id="categories_add_btn">thêm chuyên mục</button>
                        </div>
                    </div> -->
                </div>
                <div class="row mt-25">
                    <div class="col l-12 m-12 c-12">
                        <div class="admin__song-btn">
                            <button id="categories_add_btn">thêm chuyên mục</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal add song -->
    <div class="modal modal-add-song" id="myModal_AddCategories">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Thêm chuyên mục</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <form id="myAddCategoriesForm" action="./categories-api/add-image-files.php" method="post" enctype="multipart/form-data">
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <label class="add-form_label" for="categories_add">Tên chuyên mục</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập tên chuyên mục" name="categories_add" id="categories_add">
                            </div>

                            <div class="auth-form__group">
                                <label class="add-form_label" for="topic_name">Tên topic</label>
                                <select class="add-form_input" name="topic_name" id="topic_name">
                                    <option value=0>-- topic --</option>
                                    <option value=1>Lựa chọn hôm nay</option>
                                    <option value=2>Top100</option>
                                    <option value=3>Nhạc mới mỗi ngày</option>
                                </select>
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="Categories_description">Mô tả</label>
                                <textarea class="add-form_input" id="Categories_description" placeholder="Nhập mô tả" name="Categories_description"></textarea>
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="Categories_singer">Ca sĩ</label>
                                <textarea class="add-form_input" id="Categories_singer" placeholder="ca sĩ a, ca sĩ b,..." name="Categories_singer"></textarea>
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="Categories_song">Bài hát</label>
                                <textarea class="add-form_input" id="Categories_song" placeholder="bài hát a, bài hát b,..." name="Categories_song"></textarea>

                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="Categories_image">File ảnh</label>
                                <input type="file" class="add-form_input" name="Categories_image" id="Categories_image">
                            </div>

                            <span id="Add_Error_Mess">Error messageas</span>

                        </div>

                        <div class="auth-form__controls auth-form__controls-add">

                            <button type="button" id="btn-close-add-categories" class="btn auth-form__controls-back btn--normal btn-close-add-staff">Hủy</button>
                            <button type="submit" id="btn-submit-add-categories" onclick="add_categories()" class="btn btn--primary btn-add-staff">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Delete-->
    <div class="modal modal-add-song" id="myModal_DeleteCategories">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Xóa chuyên mục</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <p>Bạn muốn xóa chuyên mục <b id="deleteCategories_Name"></b> ?</p>

                    <div class="auth-form__controls auth-form__controls-add">
                        <button type="button" id="btn-close-delete-categories" class="btn auth-form__controls-back btn--normal btn-close-add-staff">Hủy</button>
                        <button type="submit" id="btn-submit-delete-categories" onclick="delete_categories()" class="btn btn--primary btn-add-staff">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal edit categories -->
    <div class="modal modal-add-song" id="myModal_EditCategories">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Sửa thông tin chuyên mục</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <form id="myEditCategoriesForm" action="#">
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <label class="add-form_label" for="categories_name_edit">Chuyên mục</label>
                                <input type="text" class="add-form_input" name="categories_name_edit" id="categories_name_edit">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="topic_name_edit">Tên topic</label>
                                <select class="add-form_input" name="topic_name_edit" id="topic_name_edit">
                                    <option value=0>-- topic --</option>
                                    <option value=1>Lựa chọn hôm nay</option>
                                    <option value=2>Top100</option>
                                    <option value=3>Nhạc mới mỗi ngày</option>
                                </select>
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="Categories_description_edit">Mô tả</label>
                                <textarea class="add-form_input TowRowtextarea" id="Categories_description_edit" placeholder="Nhập mô tả" name="Categories_description_edit"></textarea>
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="Categories_singer_edit">Ca sĩ</label>
                                <textarea class="add-form_input TowRowtextarea" id="Categories_singer_edit" placeholder="ca sĩ a, ca sĩ b,..." name="Categories_singer_edit"></textarea>
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="Categories_song_edit">Bài hát</label>
                                <textarea class="add-form_input" id="Categories_song_edit" placeholder="bài hát a, bài hát b,..." name="Categories_song_edit"></textarea>
                            </div>


                            <span id="edit_Error_Mess">Error messageas</span>
                        </div>
                        <div class="auth-form__controls auth-form__controls-edit">
                            <button type="button" id="btn-close-edit-categories" class="btn auth-form__controls-back btn--normal btn-close-edit-staff">Hủy</button>
                            <button type="button" id="btn-submit-edit-categories" onclick="edit_categories()" class="btn btn--primary btn-edit-staff">Sửa</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal view song -->
    <div class="modal modal-add-song" id="myModal_ViewCategories">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Thông tin chuyên mục</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <form id="myViewUserForm" class="ViewForm" action="#">
                        <div class="add-form_input">
                            <b>ID</b>
                            <span id="categories_id_view">12</span>
                        </div>
                        <div class="add-form_input">
                            <b>Chuyên mục</b>
                            <span id="categories_name_view">USER A</span>
                        </div>
                        <div class="add-form_input">
                            <b>Topic</b>
                            <span id="categories_topic_view">Email@email.com</span>
                        </div>
                        <div class="add-form_input">
                            <b>Lượt thích</b>
                            <span id="categories_follow_view">Email@email.com</span>
                        </div>
                        <div class="add-form_input">
                            <b>Ngày tạo</b>
                            <span id="categories_date_view">Nam</span>
                        </div>
                        <div class="add-form_input div_view_categories ">
                            <b>Mô tả</b>
                            <textarea readonly id="categories_description_view" placeholder="Mô tả" name="categories_description"></textarea>
                        </div>
                        <div class="add-form_input div_view_categories">
                            <b>Ca sĩ</b>
                            <textarea readonly id="categories_singers_view" placeholder="Ca sĩ" name="categories_singers_view"></textarea>
                        </div>
                        <div class="add-form_input div_view_categories">
                            <b>Bài hát</b>
                            <textarea readonly id="categories_songs_view" placeholder="Bài hát" name="categories_songs_view"></textarea>
                        </div>
                        <div class="add-form_input">
                            <b>File ảnh</b>
                            <span id="categories_image_view">bài a, bài b</span>
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
<script src="https://malsup.github.io/jquery.form.js"></script>
<script src="../assets/js/admin_categories.js"></script>



</html>