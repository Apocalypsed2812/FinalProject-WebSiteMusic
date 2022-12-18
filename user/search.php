<?php
$display = "none";
require_once('connectdb.php');
$info = "NULLLLLLLL";
if (isset($_POST['btnSubmit'])) {
    $info = $_POST['search'];
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
            <div class="grid wide">
                <div class="row mt-110 search__header">
                    <div class="search__header-text">Kết quả tìm kiếm</div>
                    <!-- <ul id="tag" class="search__header-list">
                        <li onclick="openAll(this)" class="search__header-item">
                            <a href="#">Tất cả</a>
                        </li>
                        <li onclick="openPage('songs',this)" class="search__header-item">
                            <a href="#">Bài hát</a>
                        </li>
                        <li onclick="openPage('playlist',this)" class="search__header-item hide-on-tablet hide-on-mobile">
                            <a href="#">Playlist/album</a>
                        </li>
                        <li onclick="openPage('artist',this)" class="search__header-item hide-on-tablet hide-on-mobile">
                            <a href="#" >Nghệ sĩ/oa</a>
                        </li>
                        <li class="search__header-item hide-on-tablet hide-on-mobile">
                            <a href="#">MV</a>
                        </li>
                    </ul> -->
                </div>

                <!-- Nổi bật -->
                <!-- <div id="highlight" class="row mt-32 tag">
                    <div class="col l-12 m-12 c-12">
                        <h1 class="container__today">Nổi bật</h1>
                    </div>
                    <?php
                    $sql = "SELECT singer FROM songs WHERE name LIKE '$info %' or name LIKE '% $info' or name like '%$info%' Limit 3";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            $name = explode(",", $row['singer']);
                            echo '<div class="col l-4 m-6 c-12">';
                            echo '<a href="" class="search__impress">';
                            echo ' <img src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/b/f/c/f/bfcf5a819c1bdf76a5a7cb9a780ca721.jpg" alt="" class="search__impress-img">';
                            echo '<div class="search__impress-text">';
                            echo '<p>Nghệ sĩ</p>';
                            echo '<p>' . $name[0] . '</p>
                                    <p>84K quan tâm</p>';
                            echo '</div>';
                            echo '</a>';
                            echo '</div>';
                        }
                    } else {
                        $sql2 = "SELECT singer FROM songs";
                        $result = $conn->query($sql2);
                        if ($result->num_rows > 0) {
                            $name = "";
                            $count = 0;
                            while ($row = $result->fetch_assoc()) {
                                if ($row['singer'] != $name) {
                                    echo '<div class="col l-4 m-6 c-12">';
                                    echo '<a href="" class="search__impress">';
                                    echo ' <img src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/b/f/c/f/bfcf5a819c1bdf76a5a7cb9a780ca721.jpg" alt="" class="search__impress-img">';
                                    echo '<div class="search__impress-text">';
                                    echo '<p>Nghệ sĩ</p>';
                                    echo '<p>' . $row['singer'] . '</p>
                                            <p>84K quan tâm</p>';
                                    echo '</div>';
                                    echo '</a>';
                                    echo '</div>';
                                    $name = $row['singer'];
                                    $count++;
                                } else {
                                    $name = $row['singer'];
                                }
                                if ($count == 3) {
                                    break;
                                }
                            }
                        }
                    }
                    ?>
                </div> -->

                <!-- Playlist nổi bật -->
                <!-- <div id="playlist" class="row mt-32 tag">
                    <div class="col l-12 m-12 c-12">
                        <h1 class="container__today">Playlist nổi bật</h1>
                    </div>
                    <div class="col l-2-4 m-6 c-12">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/f/3/7/3/f373b6088a9ccf34b3fb2f46e587a6b5.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">Những bài hát hay nhất</p>
                            <p class="container__song-today-description">Vương Anh Tú</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col l-2-4 m-6 c-12">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/f/3/7/3/f373b6088a9ccf34b3fb2f46e587a6b5.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">Những bài hát hay nhất</p>
                            <p class="container__song-today-description">Vương Anh Tú</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col l-2-4 m-6 c-12">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/avatars/f/3/7/3/f373b6088a9ccf34b3fb2f46e587a6b5.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">Những bài hát hay nhất</p>
                            <p class="container__song-today-description">Vương Anh Tú</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                </div> -->

                <!-- Bài hát -->
                <div id="songs" class="row mt-32 tag ">
                    <!-- <div class="col l-12 m-12 c-12">
                        <h1 class="container__today">Mới phát hành</h1>
                    </div> -->
                    <div class="col l-12">
                        <div class="row search-playlist playlist">
                            <?php
                            $sql = "SELECT * FROM songs WHERE name LIKE '$info %' or name LIKE '% $info' or name = '$info'";
                            $result = $conn->query($sql);
                            $index = 0;
                            if ($result->num_rows > 0) {
                                while ($row = $result->fetch_assoc()) {
                                    $lyric = str_replace('"', "'", $row["lyric"]);
                                    echo "<div class='col l-6 m-6 c-12'>";
                                    echo '<div class="container__song-new" data-id="' . $row['id'] . '"  data-image="' . $row['image'] . '" data-name="' . $row["name"] . '" data-singer="' . $row["singer"] . '" data-file="' . $row["file"] . '" data-index="' . $index . ' data-lyric='.$lyric.'">';
                                    echo '<img src="../assets/images/songs/' . $row['image'] . '" alt="" class="container__song-new-img">';
                                    echo '<div class="container__song-info container__song-info-search">';
                                    echo '<p class="container__song-new-title">' . $row["name"] . '</p>';
                                    echo '<p class="container__song-new-description">' . $row["singer"] . '</p>';
                                    echo '</div>';
                                    echo '<div class="container__song-new-click">
                                                <i class="fa-solid fa-circle-play"></i>
                                            </div>';
                                    echo '<div class="container__song-new-dot">
                                            <i class="fa-solid fa-ellipsis" onclick="ellipsisClick(' . $row['id'] . ')"></i>
                                        </div>';
                                    echo '</div>';
                                    echo  '<div id="Song_dialog' . $row["id"] . '" class="Song_dialog_search">' .
                                    '<div class="new__music-song-info">' .
                                    '<img src="../assets/images/songs/' . $row["image"] . '" alt="">' .
                                    '<div>' .
                                    '<p style="color:white;">' . $row["name"] . '</p>' .
                                    '<p class="new__music-song-info-o mt-8">' . $row["singer"] . '</p>' .
                                    '</div>' .
                                    '</div>' .
                                    '<div class="Song_dialog_item"><i class="fa-solid fa-plus"></i>Thêm vào playlist' .
                                    '</div>' .
                                    '<div onclick="SongLyricView(`' . $lyric . '`)" class="Song_dialog_item"><i class="fa-solid fa-book"></i>Lời bài hát' .
                                    '</div>' .
                                    '<a href="../assets/audio/'. $row['file'] .'" download >
                                        <div class="Song_dialog_item"><i class="fa-solid fa-download"></i>Tải xuống 
                                        </div>' .
                                    '</a>' .
                                    '</div>';
                                    echo '</div>';
                                    $index += 1;
                                }
                            } else {
                                echo "<div class='col l-6 m-6 c-12'>";
                                echo '<div class="container__song-info container__song-info-search">';
                                echo '<p class="resultNull">Không tìm được bài hát tương ứng</p>';
                                echo '</div>';
                                echo '</div>';
                            }
                            ?>
                        </div>
                    </div>
                </div>

                <!-- Lựa chọn hôm nay -->
                <div id="selection" class="row mt-32 tag">
                    <div class="col l-12 m-12 c-12">
                        <h1 class="container__today">Lựa chọn hôm nay</h1>
                    </div>
                    <?php
                    $sql = "SELECT * FROM categories WHERE topic = 'Lựa chọn hôm nay'";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            echo "<div class=\"col l-2-4 c-12\">";
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
                <!-- <div id="artist" class="row mt-32 tag">
                    <div class="col l-12 m-12 c-12">
                        <h1 class="container__today">Nghệ sĩ yêu thích</h1>
                    </div>
                    <div class="col l-2-4 m-6 c-12">
                        <a href="" class="container__artist">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w480_r2x3_webp/cover_artist/1/5/6/c/156c8abddc5952a112c02d8d5f2a82f6.jpg" alt="" class="container__artist-img">
                            <p class="container__artist-name">Soobin</p>
                        </a>
                    </div>
                    <div class="col l-2-4 m-6 c-12">
                        <a href="" class="container__artist">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w480_r2x3_webp/cover_artist/4/9/9/8/4998b23157ede157545b5d1a01800fcd.jpg" alt="" class="container__artist-img">
                            <p class="container__artist-name">Hòa Minzy</p>
                        </a>
                    </div>
                    <div class="col l-2-4 m-6 c-12">
                        <a href="" class="container__artist">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w480_r2x3_webp/cover_artist/e/f/c/7/efc7d2cf0bd476eb30d953adfbac3dd8.jpg" alt="" class="container__artist-img">
                            <p class="container__artist-name">JustaTee</p>
                        </a>
                    </div>
                    <div class="col l-2-4 m-6 c-12">
                        <a href="" class="container__artist">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w480_r2x3_webp/cover_artist/9/1/3/4/913455bd592bc4b44d55ed165dbbf06f.jpg" alt="" class="container__artist-img">
                            <p class="container__artist-name">OnlyC</p>
                        </a>
                    </div>
                    <div class="col l-2-4 m-6 c-12">
                        <a href="" class="container__artist">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w480_r2x3_webp/cover_artist/b/0/c/3/b0c3bc16ca25baed31d8e905ddaf8a1f.jpg" alt="" class="container__artist-img">
                            <p class="container__artist-name">MIN</p>
                        </a>
                    </div>
                </div> -->
                <div class="music__play">

                </div>
            </div>
        </div>


    </div>

    <script src="../assets/js/search.js"></script>
    <script src="../assets/js/searchPaging.js"></script>

</body>

</html>