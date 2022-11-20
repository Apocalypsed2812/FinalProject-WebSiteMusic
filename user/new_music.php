<?php
    require_once("connectdb.php");
    $id = "";
    if(isset($_GET['id'])){
        $id = $_GET['id'];
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
                   <div class="col l-5 m-12">
                        <div class="music__list-item">
                            <?php
                                $sql = "SELECT * FROM category WHERE id='$id'";
                                $result = $conn->query($sql);
                                if($result->num_rows > 0){
                                    while($row = $result->fetch_assoc()){
                            ?>
                            <img src="<?php echo $row['image'];?>" alt="" class="music__list-item-img">
                            <h3 class="music__list-item-title"><?php echo $row['name'];?></h3>
                            <p>Cập Nhật: <span>29/09/2022</span></p>
                            <p><?php echo $row['singers']; ?></p>
                            <p>1.9 M người yêu thích</p>
                            <button>
                                <i class="fa-solid fa-circle-play"></i>
                                Tiếp tục phát
                            </button>
                            <div class="music__list-img-click">
                                <i class="fa-solid fa-circle-play"></i>
                            </div>
                        </div>
                   </div>
    
                    <div class="col l-7">
                    <div class="row">
                        <div class="col l-12">
                            <p class="music__list-des">
                                Lời tựa
                                <span><?php echo $row['description'];
                                            }
                                        }
                                        ?>
                                </span>
                            </p>
                        </div>
                        <div class="col l-12 m-12 c-12">
                            <div class="new__music-song">
                                <div class="new__music-song-rank">
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
        </div>

        
    </div>


    <script src="../assets/js/main.js"></script>
</body>
</html>