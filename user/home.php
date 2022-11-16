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
                <div class="row mt-32 music-new-mobile">
                    <div class="col l-12 m-12 c-12">
                        <h1 class="container__today">Mới phát hành</h1>
                    </div>
                    <div class="col l-12 m-12 c-12">
                        <div class="row container__choose">
                            <div class="container__album col l-10 m-8 c-8">
                                <p class="container__album-song">Bài Hát</p>
                                <p class="container__album-album">Album</p>
                            </div>
                            <p class="container__album-all col l-2 m-4 c-4">
                                Tất cả
                                <i class="fa-solid fa-angle-right"></i>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="row playlist">

                </div>

                <!-- Lựa chọn hôm nay -->
                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12">
                        <h1 class="container__today">Lựa chọn hôm nay</h1>
                    </div>
                    <div class="col l-2-4 m-6 c-12">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/8/2/9/b/829b64c4431f9d593b36ba23b29c089c.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">Nhạc Cho Thứ Ba</p>
                            <p class="container__song-today-description">Thứ ba đầy cảm xúc với những Ballad Việt</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col l-2-4 m-6 c-12">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/0/f/6/0/0f60af04482cb3dfd68fa956a4ac501c.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">Nhạc Cho Thứ Ba</p>
                            <p class="container__song-today-description">Thứ ba đầy cảm xúc với những Ballad Việt nhẹ nhàng sâu lắng</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col l-2-4 m-6 c-12">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/e/1/1/5/e11509d65f347c71e37740daf8476eda.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">Nhạc Cho Thứ Ba</p>
                            <p class="container__song-today-description">Thứ ba đầy cảm xúc với những Ballad Việt</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col l-2-4 m-6 c-12">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/e/8/a/e/e8aec5fb40fd74fec7af79b2b7e39023.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">Nhạc Cho Thứ Ba</p>
                            <p class="container__song-today-description">Thứ ba đầy cảm xúc với những Ballad Việt</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col l-2-4 m-6 c-12">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/9/3/7/8/9378ca382617836d0fb68179de17abfd.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">Nhạc Cho Thứ Ba</p>
                            <p class="container__song-today-description">Thứ ba đầy cảm xúc với những Ballad Việt</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Nghệ sĩ yêu thích -->
                <div class="row mt-32">
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
                </div>

                <!-- Nhạc mới mỗi ngày -->
                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12">
                        <h1 class="container__today">Nhạc mới mỗi ngày</h1>
                    </div>
                    <div class="col l-2-4 c-12 m-6">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/0/8/d/e/08de33b124ffd44c460aa690e10757b0.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">V-Pop Tháng 8/2022</p>
                            <p class="container__song-today-description">OnlyC, Phương Ly, Hoàng Thùy Linh,...</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col l-2-4 c-12 m-6">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/5/6/1/6/56163bff3f91cc7041b5263fc35b162b.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">US-UK Tháng 8/2022</p>
                            <p class="container__song-today-description">Beyoncé, Calvin Harris, Billie Eilish</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col l-2-4 c-12 m-6">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/f/0/8/6/f086cbe2316120f862d69af673f60c64.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">K-Pop Tháng 8/2022</p>
                            <p class="container__song-today-description">ATEEZ, SNSD, STAYC, ITZY...</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col l-2-4 c-12 m-6">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/d/a/c/6/dac6ee3d54dd0110420493663eaf9ec8.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">C-Pop Tháng 8/2022</p>
                            <p class="container__song-today-description">Thái Từ Khôn, INTO1, Phó Mộng Đồng,...</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col l-2-4 c-12 m-6">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/0/9/f/8/09f887e077bd9883f61661fb8f1f93b7.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">Indie Việt Tháng 8/2022</p>
                            <p class="container__song-today-description">Trang, T.R.I, buitruonglinh,...</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- zingchart -->
                <div class="row mt-32">
                    <div class="col l-4">
                        <a href="" class="container__zing-song">
                            <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/song-vn-2x.jpg" alt="">
                        </a>
                    </div>
                    <div class="col l-4">
                        <a href="" class="container__zing-song">
                            <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/web_song_usuk.jpg" alt="">
                        </a>
                    </div>
                    <div class="col l-4">
                        <a href="" class="container__zing-song">
                            <img src="https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/web_song_kpop.jpg" alt="">
                        </a>
                    </div>
                </div>

                <!-- Top 100 -->
                <div class="row mt-32">
                    <div class="col l-12 m-12 c-12">
                        <h1 class="container__today">Top 100</h1>
                    </div>
                    <div class="col l-2-4 c-12 m-6">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/9/8/0/f/980fe220bd14602b466aeca6c0f8ba97.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">Top 100 Bài Nhạc...</p>
                            <p class="container__song-today-description">Khang Việt, Jack - 97, Miu Lê,...</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col l-2-4 c-12 m-6">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/6/0/6/4/606430a29783ea7f864de569bb8a45d0.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">Top 100 Âu Mỹ...</p>
                            <p class="container__song-today-description">Adele, The Kid LAROI, Justin Bieber...</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col l-2-4 c-12 m-6">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/c/5/f/c/c5fc615c43215c6b72676f42767855ee.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">Top 100 Nhạc...</p>
                            <p class="container__song-today-description">Alan Walker, K-391, Emelie Hollow...</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col l-2-4 c-12 m-6">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/f/8/e/7/f8e7c3b24c84778dbf8734c76e129cd3.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">Top 100 Nhạc Trữ Tình...</p>
                            <p class="container__song-today-description">Lưu Ánh Loan, Phi Nhung, Như Quỳnh...</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                    <div class="col l-2-4 c-12 m-6">
                        <a href="" class="container__song-today">
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/3/b/4/1/3b41c07f81c8f5cf9bd1e5eaac39ad28.jpg" alt="" class="container__song-today-img">
                            <p class="container__song-today-title">Top 100 Nhạc Hàn...</p>
                            <p class="container__song-today-description">BIGBANG, IVE, BLACKPINK...</p>
                            <div class="container__song-click">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-circle-play"></i>
                                <i class="fa-solid fa-ellipsis"></i>
                            </div>
                        </a>
                    </div>
                </div>

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
</body>
</html>