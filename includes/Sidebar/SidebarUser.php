<?php
?>
<input type="checkbox" id="navbar__mobile-header" class="nav__input-header">
<label for="navbar__mobile-header" class="container__header-overlay"></label>
<header class="header">
    <div class="header__playlist-add">
        <i class="fa-regular fa-plus"></i>
        <span class="hide-on-tablet">Tạo playlist mới</span>
    </div>
    <div class="header__logo">
        <a href="../user/home.php">
            <img src="../assets/images/music_logo.png" alt="" class="header__logo-img">
            <img src="../assets/images/music_logo_tablet.png" alt="" class="header__logo-tablet">
        </a>
    </div>
    <div class="header__content">
        <ul class="header__list">
            <li class="header__item">
                <a href="../user/personal.php" class="header__item-link">
                    <i class="fa-regular fa-circle-dot"></i>
                    <span>Cá Nhân</span>
                </a>
            </li>
            <li class="header__item">
                <a href="" class="header__item-link">
                    <i class="fa-regular fa-circle-dot"></i>
                    <span>Khám Phá</span>
                </a>
            </li>
            <li class="header__item">
                <a href="../../user/music_chart.php" class="header__item-link">
                    <i class="fa-regular fa-circle-dot"></i>
                    <span>#MusicChart</span>
                </a>
            </li>
            <li class="header__item">
                <a href="../../user/follow.php" class="header__item-link">
                    <i class="fa-regular fa-circle-dot"></i>
                    <span>Theo dõi</span>
                </a>
            </li>
        </ul>

        <div class="header__list-separate"></div>

        <ul class="header__list">
            <li class="header__item">
                <a href="../../user/new_music.php" class="header__item-link">
                    <i class="fa-solid fa-music"></i>
                    <span>Nhạc Mới</span>
                </a>
            </li>
            <li class="header__item">
                <a href="" class="header__item-link">
                    <i class="fa-regular fa-circle-dot"></i>
                    <span>Thể Loại</span>
                </a>
            </li>
            <li class="header__item">
                <a href="../../user/top100.php" class="header__item-link">
                    <i class="fa-solid fa-star"></i>
                    <span>Top 100</span>
                </a>
            </li>

            <li class="header__item header__item-tablet-icon-right">
                <a href="" class="header__item-link">
                    <i class="fa-solid fa-arrow-right"></i>
                </a>
            </li>
        </ul>
    </div>
</header>