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

<body class="AdminPage">
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
                            Thông tin người dùng
                        </p>
                    </div>
                </div>
                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12 admin__song">
                        <table border="1" class="admin__song-table">
                            <thead class="admin__song-table-head">
                                <tr>
                                    <td>ID</td>
                                    <td>Tên</td>
                                    <td>Tuổi</td>
                                    <td>Giới tính</td>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody class="admin__song-table-body">
                                <tr>
                                    <td>1</td>
                                    <td>Phạm Anh Thư</td>
                                    <td>20</td>
                                    <td>Nam</td>
                                    <td>
                                        <i class="fa-solid fa-eye"></i>
                                        <i class="fa-solid fa-trash-can"></i>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Phạm Anh Thư</td>
                                    <td>20</td>
                                    <td>Nam</td>
                                    <td>
                                        <i class="fa-solid fa-eye"></i>
                                        <i class="fa-solid fa-trash-can"></i>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Phạm Anh Thư</td>
                                    <td>20</td>
                                    <td>Nam</td>
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
                        <ul class="admin__song-pagination-list">
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


    <script src="../assets/js/main.js"></script>
</body>

</html>