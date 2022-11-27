<?php
    require('../db.php');
    session_start();
    if(!$_SESSION['isLogin']){
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

<body class="AdminPage RankPage">
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
                    <div class="col l-12">
                        <p class="new__music-title">
                            Bảng xếp hạng
                        </p>
                        <span class="alert_admin" id="Add_alert">ADD Successful</span>
                    </div>
                    <div class="col l-12 mt-32">
                        <p class="admin__rank-description-title">
                            Top 100 bài nhạc hát nghe nhiều nhất
                        </p>
                    </div>
                </div>
                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12 admin__song" style="min-height: 380px;">
                        <table border="1" class="admin__song-table">
                            <thead class="admin__song-table-head">
                                <tr>
                                    <td style="width:5%">Top</td>
                                    <td style="width:40%">Bài hát</td>
                                    <td>Ca sĩ</td>
                                    <td style="width:10%">Lượt nghe</td>
                                    <td style="width:10%">Lượt Tải</td>
                                    <td style="width:10%">Action</td>
                                    <td id="Search_value" style="display: none;">a</td>
                                </tr>
                            </thead>
                            <tbody class="admin__song-table-body" id="table-body">
                                <tr>
                                    <td>1</td>
                                    <td>Bước qua nhau</td>
                                    <td>Vũ</td>
                                    <td>11000</td>
                                    <td>10000</td>
                                    <td>
                                        <i class="fa-solid fa-eye"></i>
                                        <i class="fa-solid fa-trash-can"></i>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Bước qua nhau</td>
                                    <td>Vũ</td>
                                    <td>11000</td>
                                    <td>10000</td>
                                    <td>
                                        <i class="fa-solid fa-eye"></i>
                                        <i class="fa-solid fa-trash-can"></i>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Bước qua nhau</td>
                                    <td>Vũ</td>
                                    <td>11000</td>
                                    <td>10000</td>
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
                        <ul class="admin__song-pagination-list" id="Table_rank">
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

    <!-- Modal view song -->
    <div class="modal modal-add-song" id="myModal_ViewRank">
        <div class="modal__overlay modal__overlay-register"></div>
        <div class="modal__body modal__container">
            <div class="auth-form auth-form-register">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h2>Thông tin bài hát</h2>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <form id="myViewRankForm" action="#" class="ViewForm">
                        <div class="add-form_input">
                            <b>ID</b>
                            <span id="viewRank_id">12</span>
                        </div>
                        <div class="add-form_input">
                            <b>Tên bài hát</b>
                            <span id="viewRank_name">Ân tình trong em</span>
                        </div>
                        <div class="add-form_input">
                            <b>Ca sĩ</b>
                            <span id="viewRank_singer">Châu Khải Phong</span>
                        </div>
                        <div class="add-form_input">
                            <b>Ngày đăng</b>
                            <span id="viewRank_date">2000-11-16 12:58:41</span>
                        </div>
                        <div class="add-form_input">
                            <b>Thể Loại</b>
                            <span id="viewRank_category">Nhạc Pop</span>
                        </div>
                        <div class="add-form_input">
                            <b>Lượt nghe</b>
                            <span id="viewRank_listens">12222</span>
                        </div>
                        <div class="add-form_input">
                            <b>Lượt bình luận</b>
                            <span id="viewRank_comments">685</span>
                        </div>
                        <div class="add-form_input">
                            <b>Lượt tải xuống</b>
                            <span id="viewRank_downloads">685</span>
                        </div>
                        <div class="add-form_input">
                            <b>File nhạc</b>
                            <span id="viewRank_file">AnTinhTrongEm1.mp3</span>
                        </div>
                        <div class="add-form_input div_lyric_view_song">
                            <b class="label_lyric_view_song">Lời nhạc</b>
                            <textarea readonly id="viewRank_lyric" placeholder="Lyric" name="viewRank_lyric"></textarea>
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
<script src="../assets/js/admin_rank.js"></script>

</html>