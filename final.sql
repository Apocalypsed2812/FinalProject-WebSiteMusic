-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th10 21, 2022 lúc 04:35 PM
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
  `age` int(11) DEFAULT NULL,
  `gender` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `favoriteSong` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `recentlyListen` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `playlist` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `name`, `email`, `role`, `age`, `gender`, `favoriteSong`, `recentlyListen`, `playlist`) VALUES
(1, 'admin', '$2y$10$UA6d8dqFhh5T1WWWNZGeDetmVrMw8rGwndxxQijdKfBdte8z4l9wm', 'Anh Tiến', 'phamhuynhanhtien123@gmail.com', 'admin', 0, '', '', '', ''),
(2, 'tien123', '$2y$10$9HESZRs.VHOe5TOMGewjUO3NQTispBNBSwbZbpScMLQXc7GgSHhra', '', 'phamhuynhanhtien.12a20.2019@gmail.com', 'user', 0, '', '', '', ''),
(3, 'baokien', '$2y$10$9HESZRs.XpUMfFuTdfssdfdfV15/EybET1B/la5AMnReniaZg.7T8.', '', 'baokien2000@gmail.com', 'user', 0, '', '', '', ''),
(4, 'user1', '$2y$10$1HESZRs.XpUMfF5sghgfhgTsxMGe/EybET1B/la5AMdfReniaZg.7T8.', '', 'user1@gmail.com', 'user', 0, '', '', '', ''),
(5, 'user2', '$2y$10$2HESZRs.XpdF5TrtysdhhdOdsfMGe/EybET1B/la5AMnReniaZg.7T8.', '', 'user2@gmail.com', 'user', 0, '', '', '', ''),
(6, 'user3', '$2y$10$3HESZRs.XpUMddfFrGehjghjsdfss/EybET1B/la5AMnReniaZg.7T8.', '', 'user3@gmail.com', 'user', 0, '', '', '', ''),
(7, 'user4', '$2y$10$4HESZRs.XpUMfF5sdgsdgsdgsdhGe/EybET1B/la5AMnReniaZg.7T8.', '', 'user4@gmail.com', 'user', 0, '', '', '', ''),
(8, 'user5', '$2y$10$5HESZRs.XpUs5TOMGe/EygfhfghagsffbET1B/la5AMnReniaZg.7T8.', '', 'user5@gmail.com', 'user', 0, '', '', '', ''),
(9, 'user6', '$2y$10$6HESZRs.XpUasdfTOMGe/EybEfghhassfsaaT1B/lafnReniaZg.7T8.', '', 'user6@gmail.com', 'user', 0, '', '', '', ''),
(10, 'user7', '$2y$10$7HESZRs.XpUghfghfgfsdf5TOMGe/EybET1B/la5AMfReniaZg.7T8.', '', 'user7@gmail.com', 'user', 0, '', '', '', ''),
(11, 'user8', '$2y$10$8HESZRs.XpUMfF5TOMGe/EybET1B/lasdfdsffs5AMnReniaZg.7T8.', '', 'user8@gmail.com', 'user', 0, '', '', '', ''),
(12, 'user9', '$2y$10$11HESZRs.XpUMgfhgfghfF5TOMGe/EybET1B/la5AMnReniaZg.7T8.', '', 'user9@gmail.com', 'user', 0, '', '', '', ''),
(13, 'user10', '$2y$10$12HESZRs.XpUMfF5TOdfgdfgMGe/EybET1B/la5AMnReniaZg.7T8.', '', 'user10@gmail.com', 'user', 0, '', '', '', '');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categorys`
--

CREATE TABLE `categorys` (
  `id` int(11) NOT NULL,
  `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `numberOfsong` int(11) NOT NULL,
  `follow` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categorys`
--

INSERT INTO `categorys` (`id`, `name`, `numberOfsong`, `follow`, `date`) VALUES
(1, 'Nhạc Trẻ', 3, 0, '2022-11-16 12:58:41'),
(2, 'Không Lời', 1, 0, '2022-11-16 12:58:41'),
(3, 'Electronic', 2, 0, '2022-11-16 12:58:41'),
(4, 'Trữ tình & bolero', 0, 0, '2022-11-16 12:58:41'),
(5, 'EDM', 0, 0, '2022-11-16 12:58:41'),
(6, 'Hip-hop', 1, 0, '2022-11-16 12:58:41'),
(7, 'R&B', 0, 0, '2022-11-16 12:58:41'),
(8, 'Nhạc thiếu nhi', 0, 0, '2022-11-16 12:58:41'),
(9, 'Piano', 0, 0, '2022-11-16 12:58:41'),
(10, 'Rock', 0, 0, '2022-11-16 12:58:41'),
(11, 'Acoustic', 0, 0, '2022-11-16 12:58:41'),
(12, 'Nhạc phim', 1, 0, '2022-11-16 12:58:41');

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
  `lyric` varchar(3000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `listens` int(11) NOT NULL,
  `comments` int(11) NOT NULL,
  `downloads` int(11) NOT NULL,
  `file` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `songs`
--

INSERT INTO `songs` (`id`, `name`, `singer`, `date`, `category`, `lyric`, `listens`, `comments`,`downloads`, `file`) VALUES
(1, 'Xin Má Rước Dâu (EDM Version)', 'Diệu Kiên', '2022-11-16 12:58:41', 'Nhạc Trẻ', 'Anh ra mà xem nay làng bên rộn tiếng cười vui\nChú rể cô dâu đang cùng nâng chén rượu giao bôi\nVậy mà sao chưa thấy đâu bao mùa trăng không thấy cau trầu\nEm mong chờ câu anh hứa mai này qua đón em mần dâu\nRồi từng đêm lén nhìn nhau trao vài câu hỏi han ấm nồng\nChẳng cần nhung gấm giàu sang thiếu gì đâu nơi anh tấm lòng\nĐồng bằng sông nước mình nay đâu có thua xa gì phố đô thành?\nCoi mà như có thương thì anh phải lo tính sao cho đành\nAnh ơi nắng mưa dãi dầu về nhà xin má rước con dâu\nEm thương với ưng mình anh thôi cho tới khi ta bạc mái đầu\nMong sao tấm thân sẽ trao về người trân quý, trái tim em son vàng\nNắm lấy níu tay dắt em dù qua mấy sông hay đèo núi cao\nRồi từng đêm lén nhìn nhau trao vài câu hỏi han ấm nồng\nChẳng cần nhung gấm giàu sang thiếu gì đâu nơi anh tấm lòng\nĐồng bằng sông nước mình nay đâu có thua xa gì phố đô thành?\nCoi mà như có thương thì anh phải lo tính sao cho đành\nAnh ơi nắng mưa dãi dầu về nhà xin má rước con dâu\nEm thương với ưng mình anh thôi cho tới khi ta bạc mái đầu\nMong sao tấm thân sẽ trao về người trân quý, trái tim em son vàng\nNắm lấy níu tay dắt em dù qua mấy sông hay đèo núi cao\nAnh ơi nắng mưa dãi dầu về nhà xin má rước con dâu\nEm thương với ưng mình anh thôi cho đến khi ta bạc mái đầu\nMong sao tấm thân sẽ trao về người trân quý, trái tim em son vàng\nNắm lấy níu tay dắt em dù qua mấy sông hay đèo núi cao\nBông xanh, bông trắng rồi lại vàng bông ơ rượng ơ\nThương anh em chờ em đợi ơ rượng ơ\nChờ anh rước em về nhà\nCho thỏa lòng nhớ mong\nChờ anh rước em về nhà\nĐôi mình xây ước mơ', 0, 0,0, 'xinmaruocdauedm.mp3'),
(2, 'Thuyền Quyên', 'Diệu Kiên', '2022-11-16 12:58:42', 'Nhạc Trẻ', 'Xa xa bóng người thương\nThấp thoáng trước thềm nhà đang đưa dâu...\nNơi đây, phấn son áo màu\nEm sắp theo chồng bỏ lại bến sông kia chờ mong...\nKhải lên khúc nhạc hoàng cầm buồn ngày mình biệt ly\nCung oán, cung sầu nặng lòng tiễn chân người ra đi\nXác pháo vu quy bên thềm\nCó chăng hạnh phúc êm đềm?\nĐời người con gái đục trong\nMười hai bến nước long đong...\nDặm ngàn thiên lí tiễn người đi\nMây nước u buồn ngày biệt ly\nKhóc cho duyên mình\nĐoạn trường thương loan đò sang ngang\nÁo mới em cài màu hoa cưới\nSánh bước bên người cùng duyên mới\nNâng chén tiêu sầu\nKhải một cung đàn từ biệt nhau...\nYêu nhau, cởi áo cho nhau\nVề nhà mẹ hỏi qua cầu gió bay\nTừ nay hết duyên em trả áo\nXem như hết tình mình đã trao\nPhận duyên ta lỡ, cung thương đứt đoạn, sầu đối gương loan\nDặm ngàn thiên lý tiễn người đi\nMây nước u buồn ngày biệt ly\nKhóc cho duyên mình\nĐoạn trường thương loan đò sang ngang\nÁo mới em cài màu hoa cưới\nSánh bước bên người cùng duyên mới\nNâng chén tiêu sầu\nKhải một cung đàn từ biệt nhau\nDặm ngàn thiên lý tiễn người đi\nMây nước u buồn ngày biệt ly\nKhóc cho duyên mình\nĐoạn trường thương loan đò sang ngang\nÁo mới em cài màu hoa cưới\nSánh bước bên người cùng duyên mới\nNâng chén tiêu sầu\nKhải một cung đàn từ biệt nhau\nBướm lượn là bướm ối ả nó bay...\nBướm dậu là bướm ối ả nó bay...\nCá lặn là cá ối ả nó bơi...\nCá lội là cá ối ả nó bơi...', 0, 0,0, 'thuyenquyen.mp3'),
(3, 'Tấm Lòng Son', 'H-Kray', '2022-11-16 12:58:43', 'Nhạc Trẻ', 'Ver:\nThương cho tấm thân cơ hàn, ngậm ngùi lặng nhìn con đò sang ngang\nMộng vàng nay hoá tro tàn khi trên xe hoa ai đón đưa nàng\nNhân duyên từ nay đứt đoạn, để lại một mình thân này héo hon\nCuộc tình năm xưa chẳng còn, nhưng sao mãi giữ một tấm lòng son.\n\nPre-Chorus:\nHà cờ chi để ta phải xa cách rời, thiên ý trêu ngươi cho ta phận duyên đôi lứa đôi nơi\nLời hẹn hứa xưa giờ đây cũng sẽ hoá thừa\nMơ ước bên nhau đành thôi gửi trao người sau đón đưa\n\nChorus:\nGiọt buồn vương trên màu mắt ai\nPhía xa xăm có tiếng thở dài\nKhắc sâu mối tình không phôi phai\nTiếc cho duyên phận mình ngang trái\nTừng chiều cô liêu buồn hắt hiu\nLẽ loi chỉ tôi với cánh diều\nTháng năm cứ ngày chờ đêm trông\nNhưng sao chẳng chút hy vọng\nThuyền giờ sang sông bỏ lại bến xưa\nTiếng ai đang nấc sau ô cửa\nThả trôi nổi niềm trong cơn mưa\nCánh hoa xưa giờ còn đâu nữa\nHẹn lại lương duyên ở kiếp sau\nSẽ tay nắm tay đến khi bạc đầu\nDẫu cho có ngàn vạn thương đau\nCũng không để mất nhau\n\nRap:\nBến đò này đợi ngóng trông, đón đưa em đi theo chồng\nAnh không thể phủ lòng này, một lòng nhỏ nhoi không đổi thay\nSầu này ta nên biết, không để lạc mất nhau\nVơi sầu với tấm bi hài như ánh lửa vàng đốt tro thiên thai\nKiếp này không thân, cũng không duyên, cũng không phận\nVu quy ngày đó hạnh phúc chúc em bái đường thành thân\nKhóc làm gì nữa cô ơi em sắp xa vùng làng quê\nBước chân tới thành thị em cùng tình làng nghĩa phu thê\nYêu nhau khổ làm chi, để bây giờ xa cách lại biệt từ\nChỉ biết cuối đầu trách do bản thân khi đọc thấu hiểu dòng tâm thư\nKhông nên gặp cũng đã gặp, không nên thương cũng đã thương\nVì em đã không thương anh nên bây giờ phải xa lánh\n\nMong... ngày đó quay lại đừng xảy ra\nĐừng giữ chặt cô đến tới lúc này hãy để tâm hồn này thoát ra\nBao nhiêu niềm vui bây giờ trở thành niềm tin\nLà vì do thân mình không thấu thật chỉ giấu kín\n\nVer 2\nNơi kia có ngờ nơi đây cứ chờ dẫu cho chẳng trọn vẹn bao nhiêu ý thơ\nMông lung đứt đoạn dây tơ vỡ lở bao giấc mơ\nAi đưa chuyến đò xuôi theo cánh cò đến nơi giàu sang nhung gấm hoa\nRiêng tôi ở lại ôm thương nhớ hoài hình dung chẳng phai\n\nChorus:\nGiọt buồn vương trên màu mắt ai\nPhía xa xăm có tiếng thở dài\nKhắc sâu mối tình không phôi phai\nTiếc cho duyên phận mình ngang trái\nTừng chiều cô liêu buồn hắt hiu\nLẽ loi chỉ tôi với cánh diều', 0, 0,0, 'tamlongson.mp3'),
(4, 'The Spectre', 'Alan Walker', '2022-11-16 12:58:44', 'Electronic', 'Hello, hello\nCan you hear me\nAs I scream your name?\nHello, hello\nDo you need me\nBefore I fade away?\nIs this a place that I call home?\nTo find what I\'ve become\nWalk along the path unknown\nWe live, we love, we lie\nDeep in the dark, I don\'t need the light\nThere\'s a ghost inside me\nIt all belongs to the other side\nWe live, we love, we lie\n(We live, we love, we lie)\nHello, hello\nNice to meet you\nVoice inside my head\nHello, hello\nI believe you\nHow can I forget?\nIs this a place that I call home?\nTo find what I\'ve become\nWalk along the path unknown\nWe live, we love, we lie\nDeep in the dark, I don\'t need the light\nThere\'s a ghost inside me\nIt all belongs to the other side\nWe live, we love, we lie\n(We live, we love, we lie)\nWe live, we love, we lie', 0, 0,0, 'Spectre.mp3'),
(5, 'Nevada', 'Vicetone,Cozi Zuehlsdorff', '2022-11-16 12:58:44', 'Hip-hop', 'I\'ve been painting every fence I know\nEvery color bleeds into the same\n\'Cause before you go and walk away\nYeah, you better know where you\'re going\nHey ya, hey ya\nYou\'re a wanderer, just like me\nHey ya, hey ya\nYeah, you better know where you\'re going\nYeah, you better know where you\'re going\nI\'ve been painting every fence I know\nEvery color bleeds into the same\n\'Cause before you go and walk away\nYeah, you better know where you\'re going\nHey ya, hey ya\nYou\'re a wanderer just like me\nHey ya, hey ya\nYeah, you better know where you\'re going\nYeah, you better know where you\'re going\nHey ya, hey ya\nYou\'re a wanderer just like me\nHey ya, hey ya\nYeah, you better know where you\'re going\nYeah, you better know where you\'re going\nYeah, you better know where you\'re going\nYou\'re a wanderer just like me\nYeah, you better know where you\'re going\nYou\'re a wanderer just like me', 0, 0,0, 'Nevada.mp3'),
(6, 'Một Bước Yêu Vạn Dặm Đau (Piano Cover)', 'Piano', '2022-11-16 12:58:44', 'Không Lời', 'Nhạc không lời', 0, 0,0, 'motbuocyeuvandamdaupiano.mp3');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `categorys`
--
ALTER TABLE `categorys`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `categorys`
--
ALTER TABLE `categorys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
