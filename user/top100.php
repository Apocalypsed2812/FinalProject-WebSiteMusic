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
               <!-- Nổi bật -->
               <div class="row mt-64">
                    <div class="col l-12 m-12 c-12">
                        <h1 class="container__today">Nổi bật</h1>
                    </div>
                    <?php 
                            require_once("connectdb.php");
                            $sql = "SELECT * FROM categories where topic = 'Top100' ";
                            $result = $conn->query($sql);
                            if($result->num_rows > 0){
                                while($row = $result->fetch_assoc()){
                                    echo '<div class="col l-2-4 c-12 m-6">';
                                    echo '<a href="music_list.php?id=' . $row['id'] . '" class="container__song-today">';
                                    echo '<img src="../assets/images/categories/'. $row['image'] .'" alt="" class="container__song-today-img">';
                                    echo '<p class="container__song-today-title">'. $row['name'] .'</p>';
                                    echo ' <p class="container__song-today-description">'. $row['singers'] .'</p>';
                                    echo '<div class="container__song-click">
                                                <i class="fa-solid fa-heart"></i>
                                                <i class="fa-solid fa-circle-play"></i>
                                                <i class="fa-solid fa-ellipsis"></i>
                                            </div>';
                                    echo '</a>';
                                    echo '</div>';
                                }
                            }
                        ?> 
                <!-- Nhạc Việt Nam -->
               <div class="row mt-32">
                <div class="col l-12 m-12 c-12">
                    <h1 class="container__today">Nhạc Việt Nam</h1>
                </div>
                <?php 
                    $sql = "SELECT * FROM categories WHERE topic = 'TOP100VIET'";
                    $result = $conn->query($sql);
                    if($result->num_rows > 0){
                        while($row = $result->fetch_assoc()){
                            echo '<div class="col l-2-4 c-12 m-6">';
                            echo '<a href="music_list.php?id=' . $row['id'] . '" class="container__song-today">';
                            echo '<img src="../assets/images/categories/'. $row['image'] .'" alt="" class="container__song-today-img">';
                            echo '<p class="container__song-today-title">'. $row['name'] .'</p>';
                            echo ' <p class="container__song-today-description">'. $row['singers'] .'</p>';
                            echo '<div class="container__song-click">
                                    <i class="fa-solid fa-heart"></i>
                                    <i class="fa-solid fa-circle-play"></i>
                                    <i class="fa-solid fa-ellipsis"></i>
                                            </div>';
                            echo '</a>';
                            echo '</div>';
                        }
                    }
                ?>
            </div>

            <!-- Nhạc Châu Á -->
            <div class="row mt-32">
                <div class="col l-12 m-12 c-12">
                    <h1 class="container__today">Nhạc Châu Á</h1>
                </div>
                <?php 
                    $sql = "SELECT * FROM categories WHERE topic = 'TOP100CHAUA'";
                    $result = $conn->query($sql);
                    if($result->num_rows > 0){
                        while($row = $result->fetch_assoc()){
                            echo '<div class="col l-2-4 c-12 m-6">';
                            echo '<a href="music_list.php?id=' . $row['id'] . '" class="container__song-today">';
                            echo '<img src="../assets/images/categories/'. $row['image'] .'" alt="" class="container__song-today-img">';
                            echo '<p class="container__song-today-title">'. $row['name'] .'</p>';
                            echo ' <p class="container__song-today-description">'. $row['singers'] .'</p>';
                            echo '<div class="container__song-click">
                                    <i class="fa-solid fa-heart"></i>
                                    <i class="fa-solid fa-circle-play"></i>
                                    <i class="fa-solid fa-ellipsis"></i>
                                            </div>';
                            echo '</a>';
                            echo '</div>';
                        }
                    }
                ?>
            </div>

            <!-- Nhạc Âu Mỹ -->
            <div class="row mt-32">
                <div class="col l-12 m-12 c-12">
                    <h1 class="container__today">Nhạc Âu Mỹ</h1>
                </div>
                
                <?php 
                    $sql = "SELECT * FROM categories WHERE topic = 'TOP100AUMY'";
                    $result = $conn->query($sql);
                    if($result->num_rows > 0){
                        while($row = $result->fetch_assoc()){
                            echo '<div class="col l-2-4 c-12 m-6">';
                            echo '<a href="music_list.php?id=' . $row['id'] . '" class="container__song-today">';
                            echo '<img src="../assets/images/categories/'. $row['image'] .'" alt="" class="container__song-today-img">';
                            echo '<p class="container__song-today-title">'. $row['name'] .'</p>';
                            echo ' <p class="container__song-today-description">'. $row['singers'] .'</p>';
                            echo '<div class="container__song-click">
                                    <i class="fa-solid fa-heart"></i>
                                    <i class="fa-solid fa-circle-play"></i>
                                    <i class="fa-solid fa-ellipsis"></i>
                                            </div>';
                            echo '</a>';
                            echo '</div>';
                        }
                    }
                ?>
            </div>
            </div>
        </div>

        
    </div>


    <script src="../assets/js/main.js"></script>
</body>
</html>