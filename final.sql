-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th10 19, 2022 lúc 12:21 PM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `final`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `username` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `age` int(11),
  `gender` varchar(10) COLLATE utf8_unicode_ci ,
  `favoriteSong` varchar(1000) COLLATE utf8_unicode_ci,
  `recentlyListen` varchar(1000) COLLATE utf8_unicode_ci ,
  `playlist` varchar(1000) COLLATE utf8_unicode_ci 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `name`, `email`, `role`,`age`,`gender`,`favoriteSong`,`recentlyListen`,`playlist`) VALUES
(1, 'admin', '$2y$10$UA6d8dqFhh5T1WWWNZGeDetmVrMw8rGwndxxQijdKfBdte8z4l9wm', 'Anh Tiến', 'phamhuynhanhtien123@gmail.com', 'admin','','','','',''),
(2, 'tien123', '$2y$10$9HESZRs.VHOe5TOMGewjUO3NQTispBNBSwbZbpScMLQXc7GgSHhra', '', 'phamhuynhanhtien.12a20.2019@gmail.com', 'user','','','','',''),
(3, 'baokien', '$2y$10$zcRXEpu8xqgiTF.XpUMfFuTV15/EybET1B/la5AMnReniaZg.7T8.', '', 'baokien2000@gmail.com', 'user','','','','','');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reset_token`
--

CREATE TABLE `reset_token` (
  `email` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `expire_on` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `reset_token`
--

INSERT INTO `reset_token` (`email`, `token`, `expire_on`) VALUES
('baokien2000@gmail.com', 'd552174233e38556b833745149882451', 1668850766);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `songs`
--

CREATE TABLE `songs` (
  `id` int(11) NOT NULL,
  `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `singer` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `date` datetime NOT NULL,
  `category` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `lyric` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `listens` int(11) NOT NULL,
  `comments` int(11) NOT NULL,
  `file` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `songs`
--

INSERT INTO `songs` (`id`, `name`, `singer`, `date`, `category`, `lyric`, `listens`, `comments`, `file`) VALUES
(1, 'Xin Má Rước Dâu (EDM Version)', 'Diệu Kiên', '2022-11-16 12:58:41', 'Nhạc Trẻ', '', 0, 0, 'xinmaruocdauedm.mp3'),
(2, 'Thuyền Quyên', 'Diệu Kiên', '2022-11-16 12:58:42', 'Nhạc Trẻ', '', 0, 0, 'thuyenquyen.mp3'),
(3, 'Tấm Lòng Son', 'H-Kray', '2022-11-16 12:58:43', 'Nhạc Trẻ', '', 0, 0, 'tamlongson.mp3'),
(4, 'The Spectre', 'Alan Walker', '2022-11-16 12:58:44', 'Electronica/Danc', '', 0, 0, 'Spectre.mp3'),
(5, 'Nevada', 'Vicetone,Cozi Zuehlsdorff', '2022-11-16 12:58:44', 'Electronic', '', 0, 0, 'Nevada.mp3'),
(6, 'Một Bước Yêu Vạn Dặm Đau (Piano Cover)', 'Piano', '2022-11-16 12:58:44', 'Không Lời', '', 0, 0, 'motbuocyeuvandamdaupiano.mp3');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `reset_token`
--
ALTER TABLE `reset_token`
  ADD PRIMARY KEY (`email`);

--
-- Chỉ mục cho bảng `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
