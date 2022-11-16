<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zing MP3</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/fonts/fontawesome-free-6.1.1-web/css/all.min.css">
</head>
<body>
    <div class="app">
        <?php
            require_once('../includes/Sidebar/SidebarUser.php')
        ?>
        <div class="container">
            <?php
                require_once('../includes/Header/HeaderUser.php')
            ?>
            <div class="grid wide container-tablet container-mobile">
               <div class="row mt-110">
                    <div class="col l-12">
                        <p class="new__music-title">
                            Thư viện
                            <i class="fa-solid fa-circle-play new__music-icon-play"></i>
                        </p>
                    </div>
               </div>

               <div class="row mt-32">
                    <div class="col l-12 m-12 c-12">
                        <ul class="personal__header">
                            <li class="personal__item personal__item--active">
                                <a href="" class="personal__item-link">Bài hát</a>
                            </li>
                            <li class="personal__item">
                                <a href="" class="personal__item-link">Postcast</a>
                            </li>
                            <li class="personal__item">
                                <a href="" class="personal__item-link">Album</a>
                            </li>
                            <li class="personal__item">
                                <a href="" class="personal__item-link">MV</a>
                            </li>
                        </ul>
                    </div>
               </div>

               <div class="row mt-32">
                    <div class="col l-12 m-12 c-12">
                        <div class="personal__button">
                            <button>yêu thích</button>
                            <button>đã tải lên</button>
                        </div>
                    </div>
               </div>

               <div class="row mt-32">
                    <div class="col l-12 m-12 c-12">
                        <div class="personal__nothing">
                            <img src="..../assets/images/music_nothing.png" alt="">
                            <p>Chưa có bài hát yêu thích trong thư viện cá nhân</p>
                            <a href="">Khám phá ngay</a>
                        </div>
                    </div>
               </div>
            </div>
        </div>

        
    </div>


    <script src="../assets/js/main.js"></script>
</body>
</html>