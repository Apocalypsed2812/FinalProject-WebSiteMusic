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
    <title>Web Music</title>
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
               <div class="row mt-110 follow__nav hide-on-mobile">
                    <ul class="follow__list">
                        <li class="follow__item">
                            <a href="" class="follow__item-link follow__item-link--active">Việt Nam</a>
                        </li>
                        <li class="follow__item">
                            <a href="" class="follow__item-link">K-pop</a>
                        </li>
                        <li class="follow__item">
                            <a href="" class="follow__item-link">Usuk</a>
                        </li>
                        <li class="follow__item">
                            <a href="" class="follow__item-link">Hoa ngữ</a>
                        </li>
                        <li class="follow__item">
                            <a href="" class="follow__item-link">Nổi bật</a>
                        </li>
                    </ul>
               </div>

               <!-- Nghệ sĩ -->
               <div class="row mt-32 hide-on-tablet hide-on-mobile">
                    <div class="col l-12 follow__singer">
                        <a href=""><img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/erik.png" alt="" class="follow__singer-img"></a>
                        <a href=""><img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/erik.png" alt="" class="follow__singer-img"></a>
                        <a href=""><img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/erik.png" alt="" class="follow__singer-img"></a>
                        <a href=""><img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/erik.png" alt="" class="follow__singer-img"></a>
                        <a href=""><img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/erik.png" alt="" class="follow__singer-img"></a>
                        <a href=""><img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/erik.png" alt="" class="follow__singer-img"></a>
                        <a href=""><img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/erik.png" alt="" class="follow__singer-img"></a>
                    </div>
               </div>

               <!-- Bài đăng -->
               <div class="row mt-32">
                    <div class="col l-6 m-12 c-12">
                        <a href="" class="follow__post">
                            <div class="follow__post-header">
                                <img src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/b/f/c/f/bfcf5a819c1bdf76a5a7cb9a780ca721.jpg" alt="" class="follow__post-avatar">
                                <div>
                                    <p class="follow__post-name">Vương Anh Tú <span>Quan tâm</span></p>
                                    <p class="follow__post-time">27 tháng 9 lúc 21:30</p>
                                </div>
                            </div>
                            <div class="follow__post-content">
                                <p>Hành trình đi diễn của Vương Anh Tú tại Don Lounge Hà Nội </p>
                                <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/8/2/9/b/829b64c4431f9d593b36ba23b29c089c.jpg" alt="" class="follow__post-img">
                                <p>Icon</p>
                            </div>
                        </a>
                    </div>

                    <div class="col l-6 m-12 c-12">
                        <a href="" class="follow__post">
                            <div class="follow__post-header">
                                <img src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/b/f/c/f/bfcf5a819c1bdf76a5a7cb9a780ca721.jpg" alt="" class="follow__post-avatar">
                                <div>
                                    <p class="follow__post-name">Vương Anh Tú <span>Quan tâm</span></p>
                                    <p class="follow__post-time">27 tháng 9 lúc 21:30</p>
                                </div>
                            </div>
                            <div class="follow__post-content">
                                <p>Hành trình đi diễn của Vương Anh Tú tại Don Lounge Hà Nội </p>
                                <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/8/2/9/b/829b64c4431f9d593b36ba23b29c089c.jpg" alt="" class="follow__post-img">
                                <p>Icon</p>
                            </div>
                        </a>
                    </div>

                    <div class="col l-6 m-12 c-12">
                        <a href="" class="follow__post">
                            <div class="follow__post-header">
                                <img src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/b/f/c/f/bfcf5a819c1bdf76a5a7cb9a780ca721.jpg" alt="" class="follow__post-avatar">
                                <div>
                                    <p class="follow__post-name">Vương Anh Tú <span>Quan tâm</span></p>
                                    <p class="follow__post-time">27 tháng 9 lúc 21:30</p>
                                </div>
                            </div>
                            <div class="follow__post-content">
                                <p>Hành trình đi diễn của Vương Anh Tú tại Don Lounge Hà Nội </p>
                                <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/8/2/9/b/829b64c4431f9d593b36ba23b29c089c.jpg" alt="" class="follow__post-img">
                                <p>Icon</p>
                            </div>
                        </a>
                    </div>

                    <div class="col l-6 m-12 c-12">
                        <a href="" class="follow__post">
                            <div class="follow__post-header">
                                <img src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/b/f/c/f/bfcf5a819c1bdf76a5a7cb9a780ca721.jpg" alt="" class="follow__post-avatar">
                                <div>
                                    <p class="follow__post-name">Vương Anh Tú <span>Quan tâm</span></p>
                                    <p class="follow__post-time">27 tháng 9 lúc 21:30</p>
                                </div>
                            </div>
                            <div class="follow__post-content">
                                <p>Hành trình đi diễn của Vương Anh Tú tại Don Lounge Hà Nội </p>
                                <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/8/2/9/b/829b64c4431f9d593b36ba23b29c089c.jpg" alt="" class="follow__post-img">
                                <p>Icon</p>
                            </div>
                        </a>
                    </div>
               </div>
            </div>
        </div>

        
    </div>


    <script src="../assets/js/main.js"></script>
</body>
</html>