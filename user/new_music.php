<?php 
    // require_once('connectdb.php');
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
                            Nhạc Mới
                            <i class="fa-solid fa-circle-play new__music-icon-play"></i>
                        </p>
                    </div>
               </div>

               <div class="row mt-32">
                    <div class="col l-12 m-12 c-12">
                        <div class="new__music-song">
                            <div class="new__music-song-rank">
                                <p class="new__music-song-rank-number">1</p>
                                <p class="new__music-song-rank-separate">-</p>
                                <div class="new__music-song-info">
                                    <img src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/4/9/6/f/496fa84f1a008e3fa51668545deb33ca.jpg" alt="">
                                    <div>
                                        <p>Ân Tình Sang Trang</p>
                                        <p class="new__music-song-info-o mt-8">Châu Khải Phong, ACV</p>
                                    </div>
                                    <div class="new__music-song-click">
                                        <i class="fa-solid fa-circle-play"></i>
                                    </div>
                                </div>
                            </div>
                            <p class="hide-on-mobile new__music-song-info-o">Ân Tình Sang Trang (Single)</p>
                            <p class="new__music-song-time new__music-song-info-o">05:20</p>
                            <div class="new__music-song-action">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </div>
                    </div>

                    <div class="col l-12 m-12 c-12">
                        <div class="new__music-song">
                            <div class="new__music-song-rank">
                                <p class="new__music-song-rank-number">2</p>
                                <p class="new__music-song-rank-separate">-</p>
                                <div class="new__music-song-info">
                                    <img src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/4/9/6/f/496fa84f1a008e3fa51668545deb33ca.jpg" alt="">
                                    <div>
                                        <p>Ân Tình Sang Trang</p>
                                        <p class="new__music-song-info-o mt-8">Châu Khải Phong, ACV</p>
                                    </div>
                                    <div class="new__music-song-click">
                                        <i class="fa-solid fa-circle-play"></i>
                                    </div>
                                </div>
                            </div>
                            <p class="hide-on-mobile new__music-song-info-o">Ân Tình Sang Trang (Single)</p>
                            <p class="new__music-song-time new__music-song-info-o">05:20</p>
                            <div class="new__music-song-action">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </div>
                    </div>

                    <div class="col l-12 m-12 c-12">
                        <div class="new__music-song">
                            <div class="new__music-song-rank">
                                <p class="new__music-song-rank-number">3</p>
                                <p class="new__music-song-rank-separate">-</p>
                                <div class="new__music-song-info">
                                    <img src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_webp/cover/4/9/6/f/496fa84f1a008e3fa51668545deb33ca.jpg" alt="">
                                    <div>
                                        <p>Ân Tình Sang Trang</p>
                                        <p class="new__music-song-info-o mt-8">Châu Khải Phong, ACV</p>
                                    </div>
                                    <div class="new__music-song-click">
                                        <i class="fa-solid fa-circle-play"></i>
                                    </div>
                                </div>
                            </div>
                            <p class="hide-on-mobile new__music-song-info-o">Ân Tình Sang Trang (Single)</p>
                            <p class="new__music-song-time new__music-song-info-o">05:20</p>
                            <div class="new__music-song-action">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </div>
                    </div>
                    
               </div>
            </div>
        </div>

        
    </div>


    <script src="../assets/js/main.js"></script>
</body>
</html>