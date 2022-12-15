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

<body class="MusicChartPage">
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
                            #MusicChart
                            <i class="fa-solid fa-circle-play new__music-icon-play"></i>
                        </p>
                    </div>
                </div>

                <div class="row mt-32 playlist">
                    <?php
                    require_once("connectdb.php");
                    $sql = "SELECT * FROM `songs` ORDER BY `listens` DESC , `downloads` DESC LIMIT 100";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            $getsong[] = $row;
                        }
                    }
                    $rank = 1;
                    $index = 0;
                    foreach ($getsong as $value) {
                        $lyric = str_replace('"', "'", $value["lyric"]);
                        echo '<div class="col l-12 m-12 c-12">' .
                            '<div class="new__music-song container__song-new" data-id="' . $value['id'] . '" data-index="' . $index . '" data-image="' . $value['image'] . '" data-name="' . $value['name'] . '" data-singer="' . $value['singer'] . '" data-file="' . $value['file'] . '" data-rank="' . $rank . '"">' .
                            '<div class="new__music-song-rank">' .
                            '<p class="new__music-song-rank-number">' . $rank . '</p>' .
                            '<p class="new__music-song-rank-separate">-</p>' .
                            '<div class="new__music-song-info">' .
                            '<img src="../assets/images/songs/' . $value["image"] . '" alt="">' .
                            '<div>' .
                            '<p>' . $value["name"] . '</p>' .
                            '<p class="new__music-song-info-o mt-8">' . $value["singer"] . '</p>' .
                            '</div>' .
                            '<div class="new__music-song-click">' .
                            '<i class="fa-solid fa-circle-play"></i>' .
                            '</div>' .
                            '</div>' .
                            '</div>' .
                            '<div class="new__music-song-action">' .
                            '<i class="fa-solid fa-heart"></i>' .
                            '<i class="fa-solid fa-ellipsis onclick="ellipsisClick(' . $value['id'] . ')"></i>' .
                            '</div>' .
                            '</div>' .
                            '<div id="Song_dialog' . $value["id"] . '" class="Song_dialog">' .
                            '<div class="new__music-song-info">' .
                            '<img src="../assets/images/songs/' . $value["image"] . '" alt="">' .
                            '<div>' .
                            '<p>' . $value["name"] . '</p>' .
                            '<p class="new__music-song-info-o mt-8">' . $value["singer"] . '</p>' .
                            '</div>' .
                            '</div>' .
                            '<div class="Song_dialog_item"><i class="fa-solid fa-plus"></i>Thêm vào playlist' .
                            '</div>' .
                            '<div class="Song_dialog_item"><i class="fa-solid fa-comment"></i>Xem bình luận' .
                            '</div>' .
                            '<div onclick="SongLyricView(`' . $lyric . '`)" class="Song_dialog_item"><i class="fa-solid fa-book"></i>Lời bài hát' .
                            '</div>' .
                            '<div onclick="SongDownload(`' . $value['file'] . '`)" class="Song_dialog_item"><i class="fa-solid fa-download"></i>Tải xuống' .
                            '</div>' .
                            '</div>' .
                            '</div>';
                        $rank += 1;
                        $index += 1;
                    }
                    ?>

                </div>

                <div class="music__play">

                </div>
            </div>
        </div>
    </div>

    <!-- Modal view song -->
    <div class="modal modal-song-lyric" id="myModal_SongLyric">
        <div class="modal__overlay"></div>
        <div class="modal__body ">
            <div class="auth-form">
                <div class="auth-form__container">
                    <div class="auth-form__header">
                        <h3>Lời bài hát</h3>
                        <i class="fa-solid fa-xmark" onclick="closeModel()"></i>
                    </div>

                    <div class="add-form_input">
                        <textarea readonly id="song_lyric_textarea" placeholder="Lyric" name="song_Lyric"></textarea>
                    </div>

                    <div class="auth-form__controls">
                        <button onclick="closeModel()" type="button" id="btn-close" class="btn auth-form__controls-back btn--normal">Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../assets/js/music_chart.js"></script>
</body>

</html>