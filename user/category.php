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

                <?php
                    $sql = "SELECT *  FROM categorys";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()){ 
                    ?>
                        <div class="row category__list">
                            <div class="col l-12 m-12 c-12">
                                <h1 class="container__today"><?=$row['name']?></h1>
                            </div>
                        </div>
                        <div class="row playlist" data-category="<?=$row['name']?>">
                            
                        </div>
                    <?php
                        }
                    }
                ?>
                <div class="music__play">

                </div>
            </div>
        </div>
    </div>

    <script src="../assets/js/category.js"></script>
</body>

</html>