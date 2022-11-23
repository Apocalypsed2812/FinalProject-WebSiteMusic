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

<body class="AdminPage CategoryPage">
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
                    <div class="col l-12" id="title_category">
                        <span class="new__music-title">
                            Thông tin thể loại
                        </span>
                        <span class="alert_admin" id="category_alert">ADD Successful</span>
                    </div>
                </div>
                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12 admin__song" style="min-height: 380px;">
                        <table border="1" class="admin__song-table">
                            <thead class="admin__song-table-head">
                                <tr>
                                    <td style="width: 5%;">ID</td>
                                    <td>Tên thể loại</td>
                                    <td style="width: 15%">Số lượng bài hát</td>
                                    <td style="width: 15%">Lượt thích</td>
                                    <td style="width: 25%">Ngày tạo</td>
                                    <td style="width: 15%">Action</td>
                                    <td id="Search_value" style="display: none;">a</td>
                                    <td id="Category_value" style="display: none;">a</td>
                                </tr>
                            </thead>
                            <tbody class="admin__song-table-body" id="table-body">
                                <tr>
                                    <td>1</td>
                                    <td>Ân tình trong em</td>
                                    <td>Châu khải phong</td>
                                    <td>1235</td>
                                    <td>233</td>
                                    <td>
                                        <i class="fa-solid fa-eye"></i>
                                        <i class="fa-solid fa-trash-can"></i>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="NullValue" style="display: none;">Không có dữ liệu</p>
                    </div>
                </div>
                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12">
                        <ul class="admin__song-pagination-list" id="CategoryTable_pagination">
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
                </div>
                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12">
                        <div class="admin__song-btn">
                            <button id="category_add_btn">thêm thể loại</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal add song -->
    <div class="modal modal-add-song" id="myModal_AddCategory">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Thêm thể loại</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <form id="myAddCategoryForm" action="#">
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <label class="add-form_label" for="category_add">Tên thể loại</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập tên thể loại" name="category_name" id="category_add">
                            </div>
                            <span id="Add_Error_Mess">Error messageas</span>

                        </div>
                        <div class="auth-form__controls auth-form__controls-add">

                            <button type="button" id="btn-close-add-category" class="btn auth-form__controls-back btn--normal btn-close-add-staff">Hủy</button>
                            <button type="button" id="btn-submit-add-category" onclick="add_category()" class="btn btn--primary btn-add-staff">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Delete-->
    <div class="modal modal-add-song" id="myModal_DeleteCategory">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Xóa thể loại</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <p>Bạn muốn xóa thể loại <b id="deleteCategory_Name"></b> ?</p>

                    <div class="auth-form__controls auth-form__controls-add">
                        <button type="button" id="btn-close-delete-category" class="btn auth-form__controls-back btn--normal btn-close-add-staff">Hủy</button>
                        <button type="submit" id="btn-submit-delete-category" onclick="delete_category()" class="btn btn--primary btn-add-staff">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- Modal edit category -->
    <div class="modal modal-add-song" id="myModal_EditCategory">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Sửa tên thể loại</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <form id="myEditCategoryForm" action="#">
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <label class="add-form_label" for="category_name_edit">Thể loại</label>
                                <input type="text" class="add-form_input" name="song_id" id="category_name_edit">
                            </div>
                            <span id="edit_Error_Mess">Error messageas</span>
                        </div>
                        <div class="auth-form__controls auth-form__controls-edit">
                            <button type="button" id="btn-close-edit-category" class="btn auth-form__controls-back btn--normal btn-close-edit-staff">Hủy</button>
                            <button type="button" id="btn-submit-edit-category" onclick="edit_category()" class="btn btn--primary btn-edit-staff">Sửa</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<script src="../assets/js/admin_category.js"></script>

</html>