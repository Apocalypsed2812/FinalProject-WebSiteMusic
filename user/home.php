<?php
require_once('connectdb.php');
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
    <title>Web Music</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/fonts/fontawesome-free-6.1.1-web/css/all.min.css">
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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
                <!-- Banner image -->
                <div class="row mt-110 hide-on-mobile">
                    <div class="col l-4 m-6 c-12 mb-16">
                        <a href="" class="container__slider">
                            <img src="https://photo-zmp3.zmdcdn.me/banner/d/8/5/8/d8586a0ceb81c2ff473f92222e2e25d4.jpg" alt="">
                        </a>
                    </div>
                    <div class="col l-4 m-6 c-12 mb-16">
                        <a href="" class="container__slider">
                            <img src="https://photo-zmp3.zmdcdn.me/banner/f/7/c/e/f7ce4cbfbfc54f9b0b0f4d2ff09445ff.jpg" alt="">
                        </a>
                    </div>
                    <div class="col l-4 m-6 c-12 mb-16">
                        <a href="" class="container__slider">
                            <img src="https://photo-zmp3.zmdcdn.me/banner/4/b/1/1/4b11dc2d3379d67b1e70dec0bc428e75.jpg" alt="">
                        </a>
                    </div>
                </div>

                <!-- Nhạc mới phát hành -->
                <div class="row mt-32 music-new-mobile" id="NewMusicTitle">
                    <div class="col l-12 m-12 c-12">
                        <h1 class="container__today">Mới phát hành</h1>
                    </div>
                    <div class="col l-12 m-12 c-12">
                        <div class="row container__choose">
                            <div class="container__album col l-10 m-8 c-8">
                                <p class="container__album-song">Bài Hát</p>
                                <!-- <p class="container__album-album">Album</p> -->
                            </div>
                            <p class="container__album-all col l-2 m-4 c-4">
                                <a href="../user/new_music.php" style="color: white">
                                    Tất cả
                                    <i class="fa-solid fa-angle-right"></i>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="row playlist">

                </div>

                <!-- Lựa chọn hôm nay -->
                <div class="row mt-32" id="NewMusicToday">
                    <div class="col l-12 m-12 c-12">
                        <h1 class="container__today">Lựa chọn hôm nay</h1>
                    </div>
                    <?php
                    $sql = "SELECT * FROM categories WHERE topic = 'Lựa chọn hôm nay'";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            echo "<div class=\"col l-2-4 m-6 c-12\">";
                            echo "<a href=\"music_list.php?id=" . $row["id"] . "\" class=\"container__song-today\">";
                            echo "<img src=\"../assets/images/categories/" . $row["image"] . "\" alt=\"\" class=\"container__song-today-img\">";
                            echo "<p class=\"container__song-today-title\">" . $row["name"] . "</p>";
                            echo "<p class=\"container__song-today-description\">" . $row["description"] . "</p>";
                            echo "<div class=\"container__song-click\">";
                            echo "<i class=\"fa-solid fa-heart\"></i>";
                            echo "<i class=\"fa-solid fa-circle-play\"></i>";
                            echo "<i class=\"fa-solid fa-ellipsis\"></i>";
                            echo "</div>";
                            echo "</a>";
                            echo "</div>";
                        }
                    }
                    ?>
                </div>

                <!-- Nghệ sĩ yêu thích -->
                <!-- <div class="row mt-32">
                    <div class="col l-12 c-12 m-12">
                        <h1 class="container__today">Nghệ sĩ yêu thích</h1>
                    </div>
                    <div class="col l-2-4 c-12 m-6 ">
                        <a href="" class="container__artist">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w480_r2x3_webp/cover_artist/1/5/6/c/156c8abddc5952a112c02d8d5f2a82f6.jpg" alt="" class="container__artist-img"> 
                            <p class="container__artist-name">Soobin</p> 
                        </a>
                    </div>
                    <div class="col l-2-4 c-12 m-6">
                        <a href="" class="container__artist">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w480_r2x3_webp/cover_artist/4/9/9/8/4998b23157ede157545b5d1a01800fcd.jpg" alt="" class="container__artist-img"> 
                            <p class="container__artist-name">Hòa Minzy</p> 
                        </a>
                    </div>
                    <div class="col l-2-4 c-12 m-6">
                        <a href="" class="container__artist">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w480_r2x3_webp/cover_artist/e/f/c/7/efc7d2cf0bd476eb30d953adfbac3dd8.jpg" alt="" class="container__artist-img"> 
                            <p class="container__artist-name">JustaTee</p> 
                        </a>
                    </div>
                    <div class="col l-2-4 c-12 m-6">
                        <a href="" class="container__artist">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w480_r2x3_webp/cover_artist/9/1/3/4/913455bd592bc4b44d55ed165dbbf06f.jpg" alt="" class="container__artist-img"> 
                            <p class="container__artist-name">OnlyC</p> 
                        </a>
                    </div>
                    <div class="col l-2-4 c-12 m-6">
                        <a href="" class="container__artist">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w480_r2x3_webp/cover_artist/b/0/c/3/b0c3bc16ca25baed31d8e905ddaf8a1f.jpg" alt="" class="container__artist-img"> 
                            <p class="container__artist-name">MIN</p> 
                        </a>
                    </div>
                </div> -->

                <!-- Nhạc mới mỗi ngày -->
                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12">
                        <h1 class="container__today">Nhạc mới mỗi ngày</h1>
                    </div>
                    <?php
                    $sql = "SELECT * FROM categories WHERE topic = 'Nhạc mới mỗi ngày'";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            echo '<div class="col l-2-4 c-12 m-6">';
                            echo '<a href="music_list.php?id=' . $row['id'] . '" class="container__song-today">';
                            echo '<img src="../assets/images/categories/' . $row['image'] . '" alt="" class="container__song-today-img">';
                            echo '<p class="container__song-today-title">' . $row['name'] . '</p>';
                            echo '<p class="container__song-today-description">' . $row['singers'] . '</p>';
                            echo '<div class="container__song-click">';
                            echo '<i class="fa-solid fa-heart"></i>';
                            echo '<i class="fa-solid fa-circle-play"></i>';
                            echo '<i class="fa-solid fa-ellipsis"></i>';
                            echo '</div>';
                            echo '</a>';
                            echo '</div>';
                        }
                    }
                    ?>
                    <!-- zingchart -->
                    <div class="row mt-32">
                        <div class="col l-4">
                            <a href="" class="container__zing-song">
                                <img src="../assets/images/Capture1_cleanup.PNG" alt="">
                            </a>
                        </div>
                        <div class="col l-4">
                            <a href="" class="container__zing-song">
                                <img src="../assets/images/Capture2_cleanup.PNG" alt="">
                            </a>
                        </div>
                        <div class="col l-4">
                            <a href="" class="container__zing-song">
                                <img src="../assets/images/Capture3_cleanup.PNG" alt="">
                            </a>
                        </div>
                    </div>

                    <!-- Top 100 -->
                    <div class="row mt-32">
                        <div class="col l-12 m-12 c-12">
                            <h1 class="container__today">Top 100</h1>
                        </div>
                        <?php
                        $sql = "SELECT * FROM categories WHERE topic = 'Top100'";
                        $result = $conn->query($sql);
                        if ($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                echo '<div class="col l-2-4 c-12 m-6">';
                                echo '<a href="music_list.php?id=' . $row['id'] . '" class="container__song-today">';
                                echo '<img src="../assets/images/categories/' . $row['image'] . '" alt="" class="container__song-today-img">';
                                echo '<p class="container__song-today-title">' . $row['name'] . '</p>';
                                echo '<p class="container__song-today-description">' . $row['singers'] . '</p>';
                        ?>
                                <div class="container__song-click">
                                    <i class="fa-solid fa-heart"></i>
                                    <i class="fa-solid fa-circle-play"></i>
                                    <i class="fa-solid fa-ellipsis"></i>
                                </div>
                        <?php
                                echo '</a>';
                                echo '</div>';
                            }
                        }
                        ?>

                        <!-- Đối tác âm nhạc -->
                        <div class="row mt-32">
                            <div class="col l-12 m-12 c-12">
                                <h2 class="container__music-partner-heading">Đối tác âm nhạc</h2>
                            </div>
                            <div class="container__music-partner-list">
                                <div class="container__music-partner-item">
                                    <img src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/orcahrd.png" alt="">
                                </div>
                                <div class="container__music-partner-item">
                                    <img src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/SM-Entertainment.png" alt="">
                                </div>
                                <div class="container__music-partner-item">
                                    <img src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/empire.png" alt="">
                                </div>
                                <div class="container__music-partner-item">
                                    <img src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/monstercat.png" alt="">
                                </div>
                                <div class="container__music-partner-item">
                                    <img src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/beggers.png" alt="">
                                </div>
                                <div class="container__music-partner-item">
                                    <img src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/FUGA.png" alt="">
                                </div>
                                <div class="container__music-partner-item">
                                    <img src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/yg.png" alt="">
                                </div>
                                <div class="container__music-partner-item">
                                    <img src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/universal-1.png" alt="">
                                </div>
                                <div class="container__music-partner-item">
                                    <img src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/Kakao-M.png" alt="">
                                </div>
                                <div class="container__music-partner-item">
                                    <img src="https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/sony.png" alt="">
                                </div>
                            </div>
                        </div>

                        <div class="music__play">

                        </div>
                    </div>
                </div>


            </div>

            <script src="../assets/js/main.js"></script>
            <script src="../assets/js/recomend.js"></script>
</body>

</html>