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
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` varchar(15) NOT NULL,
  `name` varchar(40) NOT NULL,
  `image` varchar(150) NOT NULL,
  `description` varchar(100) NOT NULL,
  `singers` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `image`, `description`, `singers`) VALUES
('HN1', 'Nhạc cho thứ 3', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/8/2/9/b/829b64c4431f9d593b36ba23b29c089c.jpg', 'Thứ ba đầy cảm xúc với những Ballad Việt', 'Tăng Duy Tân, Hoàng Thùy Linh, Trịnh Thăng Bình'),
('HN2', 'Indie Buồn', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/0/f/6/0/0f60af04482cb3dfd68fa956a4ac501c.jpg', 'Thanh âm Indie buồn', 'Nhật Kim Anh, Trúc Nhân, Ngô Kiến Huy'),
('HN3', 'Heart-break Pop', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/e/1/1/5/e11509d65f347c71e37740daf8476eda.jpg', 'Heart-break Pop buồn sâu lắng', 'Tăng Duy Tân, Hoàng Thùy Linh, Trịnh Thăng Bình'),
('HN4', 'V-Pop Hit ', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/e/8/a/e/e8aec5fb40fd74fec7af79b2b7e39023.jpg', 'V-Pop Những Bản Hit Chậm Mà Chắc', 'Tăng Duy Tân, Hoàng Thùy Linh, Trịnh Thăng Bình'),
('HN5', 'Trending', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/9/3/7/8/9378ca382617836d0fb68179de17abfd.jpg', 'Nhạc Trending thịnh hành với giới trẻ', 'Tăng Duy Tân, Hoàng Thùy Linh, Trịnh Thăng Bình'),
('T1', 'TOP 100 Bài Nhạc...', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/9/8/0/f/980fe220bd14602b466aeca6c0f8ba97.jpg', 'Top 100 nhạc trẻ', 'Khang Việt, Jack-97, Miu Lê'),
('T2', 'Top 100 Âu Mỹ...', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/6/0/6/4/606430a29783ea7f864de569bb8a45d0.jpg', 'Top 100 Pop Âu Mỹ', 'Khang Việt, Jack-97, Miu Lê'),
('T3', 'Top 100 nhạc...', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/c/5/f/c/c5fc615c43215c6b72676f42767855ee.jpg', 'Top 100 EDM', 'Khang Việt, Jack-97, Miu Lê'),
('T4', 'Top 100 Nhạc Trữ Tình...', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/f/8/e/7/f8e7c3b24c84778dbf8734c76e129cd3.jpg', 'Top 100 Nhạc Trữ Tình', 'Khang Việt, Jack-97, Miu Lê'),
('T5', 'Top 100 Nhạc Hàn...', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/3/b/4/1/3b41c07f81c8f5cf9bd1e5eaac39ad28.jpg', 'Top 100 Hàn Quốc', 'Khang Việt, Jack-97, Miu Lê'),
('NM1', 'V-Pop Tháng 8/2022', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/0/8/d/e/08de33b124ffd44c460aa690e10757b0.jpg', 'Nhạc hot V-Pop tháng 8 với nhiều ca sĩ khác nhau', 'OnlyC, Phương Ly, Hoàng Thùy Linh'),
('NM2', 'US-UK Tháng 8/2022', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/5/6/1/6/56163bff3f91cc7041b5263fc35b162b.jpg', 'Nhạc hot US-UK tháng 8 với nhiều ca sĩ khác nhau', 'Beyoncé, Calvin Harris, Billie Eilish'),
('NM3', 'K-Pop Tháng 8/2022', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/f/0/8/6/f086cbe2316120f862d69af673f60c64.jpg', 'Nhạc hot K-Pop tháng 8 với nhiều ca sĩ khác nhau', 'ATEEZ, SNSD, STAYC, ITZY'),
('NM4', 'C-Pop Tháng 8/2022', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/d/a/c/6/dac6ee3d54dd0110420493663eaf9ec8.jpg', 'Nhạc hot C-Pop tháng 8 với nhiều ca sĩ khác nhau', 'Thái Từ Khôn, INTO1, Phó Mộng Đồng'),
('NM5', 'Indie Việt Tháng 8/2022', 'https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/0/9/f/8/09f887e077bd9883f61661fb8f1f93b7.jpg', 'Nhạc hot Indie tháng 8 với nhiều ca sĩ khác nhau', 'Trang, T.R.I, buitruonglinh');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
