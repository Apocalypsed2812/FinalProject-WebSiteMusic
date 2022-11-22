-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2022 at 08:40 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `topic` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `follow` int(11) NOT NULL,
  `image` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `date`datetime NOT NULL,
  `description` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `singers` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `songs` varchar(5000) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`,`topic`, `follow` ,`image`,`date`, `description`, `singers`,`songs`) VALUES
(1, 'Nhạc cho thứ 3','Lựa chọn hôm nay',0,'T3.jpg','2022-11-16 12:58:41', 'Thứ ba đầy cảm xúc với những Ballad Việt', 'Tăng Duy Tân, Hoàng Thùy Linh, Trịnh Thăng Bình','Xin Má Rước Dâu (EDM Version),The Spectre,Nevada'),
(2, 'Indie Buồn','Lựa chọn hôm nay',0, 'IndieBuon.jpg','2022-11-16 12:58:41', 'Thanh âm Indie buồn', 'Nhật Kim Anh, Trúc Nhân, Ngô Kiến Huy','Xin Má Rước Dâu (EDM Version),The Spectre,Một Bước Yêu Vạn Dặm Đau (Piano Cover)'),
(3, 'Heart-break Pop','Lựa chọn hôm nay',0,'heartbreakPop.jpg','2022-11-16 12:58:41', 'Heart-break Pop buồn sâu lắng', 'Tăng Duy Tân, Hoàng Thùy Linh, Trịnh Thăng Bình','Thuyền Quyên,Nevada,Một Bước Yêu Vạn Dặm Đau (Piano Cover)'),
(4, 'V-Pop Hit ','Lựa chọn hôm nay',0, 'VPopHit.jpg','2022-11-16 12:58:41', 'V-Pop Những Bản Hit Chậm Mà Chắc', 'Tăng Duy Tân, Hoàng Thùy Linh, Trịnh Thăng Bình','Thuyền Quyên,The Spectre,Nevada'),
(5, 'Trending','Lựa chọn hôm nay',0, 'trending.jpg','2022-11-16 12:58:41', 'Nhạc Trending thịnh hành với giới trẻ', 'Tăng Duy Tân, Hoàng Thùy Linh, Trịnh Thăng Bình','Xin Má Rước Dâu (EDM Version),Tấm Lòng Son,Nevada'),
(6, 'TOP 100 Bài Nhạc...','Top100',0, 'top100_NhacTre.jpg','2022-11-16 12:58:41', 'Top 100 nhạc trẻ', 'Khang Việt, Jack-97, Miu Lê','Xin Má Rước Dâu (EDM Version),Tấm Lòng Son,Một Bước Yêu Vạn Dặm Đau (Piano Cover)'),
(7, 'Top 100 Âu Mỹ...','Top100',0, 'top100_AuMy.jpg','2022-11-16 12:58:41', 'Top 100 Pop Âu Mỹ', 'Khang Việt, Jack-97, Miu Lê','Xin Má Rước Dâu (EDM Version),Tấm Lòng Son,Một Bước Yêu Vạn Dặm Đau (Piano Cover)'),
(8, 'Top 100 nhạc...','Top100',0, 'top100_EDM.jpg','2022-11-16 12:58:41', 'Top 100 EDM', 'Khang Việt, Jack-97, Miu Lê','Tấm Lòng Son,Nevada,Một Bước Yêu Vạn Dặm Đau (Piano Cover)'),
(9, 'Top 100 Nhạc Trữ Tình...','Top100',0, 'top100_TruTinh.jpg','2022-11-16 12:58:41', 'Top 100 Nhạc Trữ Tình', 'Khang Việt, Jack-97, Miu Lê','Xin Má Rước Dâu (EDM Version),Thuyền Quyên,Nevada'),
(10, 'Top 100 Nhạc Hàn...','Top100',0, 'top100_Han.jpg','2022-11-16 12:58:41', 'Top 100 Hàn Quốc', 'Khang Việt, Jack-97, Miu Lê','The Spectre,Nevada,Một Bước Yêu Vạn Dặm Đau (Piano Cover)'),
(11, 'V-Pop Tháng 8/2022','Nhạc mới mỗi ngày',0, 'vpop_T8.jpg','2022-11-16 12:58:41', 'Nhạc hot V-Pop tháng 8 với nhiều ca sĩ khác nhau', 'OnlyC, Phương Ly, Hoàng Thùy Linh','Xin Má Rước Dâu (EDM Version),Nevada,Một Bước Yêu Vạn Dặm Đau (Piano Cover)'),
(12, 'US-UK Tháng 8/2022','Nhạc mới mỗi ngày',0, 'usuk_T8.jpg','2022-11-16 12:58:41', 'Nhạc hot US-UK tháng 8 với nhiều ca sĩ khác nhau', 'Beyoncé, Calvin Harris, Billie Eilish','Thuyền Quyên,Tấm Lòng Son,Một Bước Yêu Vạn Dặm Đau (Piano Cover)'),
(13, 'K-Pop Tháng 8/2022','Nhạc mới mỗi ngày',0, 'kpop_T8.jpg','2022-11-16 12:58:41', 'Nhạc hot K-Pop tháng 8 với nhiều ca sĩ khác nhau', 'ATEEZ, SNSD, STAYC, ITZY','Xin Má Rước Dâu (EDM Version),The Spectre,Nevada'),
(14, 'C-Pop Tháng 8/2022','Nhạc mới mỗi ngày',0, 'cpop_T8.jpg','2022-11-16 12:58:41', 'Nhạc hot C-Pop tháng 8 với nhiều ca sĩ khác nhau', 'Thái Từ Khôn, INTO1, Phó Mộng Đồng','Thuyền Quyên,The Spectre,Nevada'),
(15, 'Indie Việt Tháng 8/2022','Nhạc mới mỗi ngày',0, 'indieViet_T8.jpg','2022-11-16 12:58:41', 'Nhạc hot Indie tháng 8 với nhiều ca sĩ khác nhau', 'Trang, T.R.I, buitruonglinh','Tấm Lòng Son,The Spectre,Một Bước Yêu Vạn Dặm Đau (Piano Cover)');
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
