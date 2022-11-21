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
                            Thông tin chuyên mục
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
                                    <td>Tên chuyên mục</td>
                                    <td>Số lượng bài hát</td>
                                    <td>Lượt thích</td>
                                    <td>Ngày tạo</td>
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
                        <ul class="admin__song-pagination-list" id="Table_category">
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
                            <button>thêm chuyên mục</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<script src="../assets/js/admin_category.js"></script>

</html>