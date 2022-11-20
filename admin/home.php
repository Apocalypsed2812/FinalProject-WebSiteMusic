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

    <!-- <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script> -->

</head>

<body class="AdminPage HomePage">
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
                    <div class="col l-12" id="title_home">
                        <span class="new__music-title">
                            Thông tin bài hát
                        </span>
                        <span class="alert_admin" id="Add_alert">ADD Successful</span>
                    </div>
                </div>
                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12 admin__song">
                        <table border="1" class="admin__song-table">
                            <thead class="admin__song-table-head">
                                <tr>
                                    <td>ID</td>
                                    <td>Tên</td>
                                    <td>Ca sĩ</td>
                                    <td>Lượt nghe</td>
                                    <td>Bình luận</td>
                                    <td>Action</td>
                                    <td id="Search_value" style="display: none;">a</td>
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
                </div>

                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12">
                        <div class="admin__song-btn">
                            <button>thêm bài hát</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Delete-->
    <div class="modal modal-add-song" id="myModal_DeleteSong">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Xóa bài hát</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <p>Bạn muốn xóa bài hát <b id="deleteSong_Name"></b> ?</p>

                    <div class="auth-form__controls auth-form__controls-add">
                        <button type="button" id="btn-close-delete-song" class="btn auth-form__controls-back btn--normal btn-close-add-staff">Hủy</button>
                        <button type="submit" id="btn-submit-delete-song" onclick="delete_song()" class="btn btn--primary btn-add-staff">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal add song -->
    <div class="modal modal-add-song" id="myModal_AddSong">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Thêm bài hát</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <form id="myForm" action="./songs-api/add-mp3-files.php" method="post" enctype="multipart/form-data">
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_name_add_song">Tên bài hát</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập tên bài hát" name="song_name" id="song_name_add_song">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_singer_add_song">Tên Ca sĩ</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập tên ca sĩ" name="song_singer" id="song_singer_add_song">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_category_add_song">Thể loại nhạc</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập thể loại" name="song_category" id="song_category_add_song">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_Lyric_add_song">Lyric</label>
                                <textarea id="song_Lyric_add_song" placeholder="Lyric" name="song_Lyric" rows="10" cols="57"></textarea>
                                <!-- <input type="text" class="add-form__input" placeholder="Lyric" name="song_Lyric"
                                    id="song_Lyric_add_song"> -->
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_files_add_song">File nhạc</label>
                                <input type="file" class="add-form_input" name="song_files" id="song_files_add_song">
                            </div>
                            <span id="Add_Error_Mess">Error messageas</span>

                        </div>

                        <div class="auth-form__controls auth-form__controls-add">

                            <button type="button" id="btn-close-add-song" class="btn auth-form__controls-back btn--normal btn-close-add-staff">Hủy</button>
                            <button type="submit" id="btn-submit-add-song" onclick="add_song()" class="btn btn--primary btn-add-staff">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal edit song -->
    <div class="modal modal-add-song" id="myModal_EditSong">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Sửa thông tin bài hát</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <form id="myEditForm" action="#">
                        <div class="auth-form__form">
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_id_edit_song">ID bài hát</label>
                                <input readonly type="text" class="add-form_input" name="song_id" id="song_id_edit_song">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_name_edit_song">Tên bài hát</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập tên bài hát" name="song_name" id="song_name_edit_song">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_singer_edit_song">Tên Ca sĩ</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập tên ca sĩ" name="song_singer" id="song_singer_edit_song">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_category_edit_song">Thể loại nhạc</label>
                                <input type="text" class="add-form_input" placeholder="Vui lòng nhập thể loại" name="song_category" id="song_category_edit_song">
                            </div>
                            <div class="auth-form__group">
                                <label class="add-form_label" for="song_lyric_edit_song">Lyric</label>
                                <textarea id="song_lyric_edit_song" placeholder="Lyric" name="song_Lyric" rows="10" cols="57"></textarea>
                                <!-- <input type="text" class="edit-form__input" placeholder="Lyric" name="song_Lyric"
                                    id="song_Lyric_edit_song"> -->
                            </div>
                            <span id="edit_Error_Mess">Error messageas</span>

                        </div>
                        <div class="auth-form__controls auth-form__controls-edit">

                            <button type="button" id="btn-close-edit-song" class="btn auth-form__controls-back btn--normal btn-close-edit-staff">Hủy</button>
                            <button type="button" id="btn-submit-edit-song" onclick="edit_song()" class="btn btn--primary btn-edit-staff">Sửa</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal view song -->
    <div class="modal modal-add-song" id="myModal_ViewSong">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Thông tin bài hát</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <form id="myViewForm" action="#">
                        <div class="add-form_input">
                            <b>ID</b>
                            <span id="viewSong_id">12</span>
                        </div>
                        <div class="add-form_input">
                            <b>Tên bài hát</b>
                            <span id="viewSong_name">Ân tình trong em</span>
                        </div>
                        <div class="add-form_input">
                            <b>Ca sĩ</b>
                            <span id="viewSong_singer">Châu Khải Phong</span>
                        </div>
                        <div class="add-form_input">
                            <b>Ngày đăng</b>
                            <span id="viewSong_date">2000-11-16 12:58:41</span>
                        </div>
                        <div class="add-form_input">
                            <b>Thể Loại</b>
                            <span id="viewSong_category">Nhạc Pop</span>
                        </div>
                        <div class="add-form_input">
                            <b>Lượt nghe</b>
                            <span id="viewSong_listens">12222</span>
                        </div>
                        <div class="add-form_input">
                            <b>Lượt bình luận</b>
                            <span id="viewSong_comments">685</span>
                        </div>
                        <div class="add-form_input">
                            <b>File nhạc</b>
                            <span id="viewSong_file">AnTinhTrongEm1.mp3</span>
                        </div>
                        <div class="add-form_input div_lyric_view_song">
                            <b class="label_lyric_view_song">Lời nhạc</b>
                            <textarea readonly id="song_lyric_view_song" placeholder="Lyric" name="song_Lyric"></textarea>
                        </div>

                        <div class="auth-form__controls auth-form__controls-edit">
                            <button type="button" id="btn-close-view-song" class="btn auth-form__controls-back btn--normal btn-close-edit-staff">Đóng</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<script src="https://malsup.github.io/jquery.form.js"></script>

<!-- <script src="../assets/js/main.js"></script> -->
<script src="../assets/js/admin_home.js"></script>



</html>