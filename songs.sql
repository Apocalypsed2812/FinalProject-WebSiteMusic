SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- 
-- Database: `final`
-- 

-- --------------------------------------------------------

-- 
-- Table structure for table `songs`
-- 

CREATE TABLE `songs` (
  `id` int(11) NOT NULL,
  `name` varchar(40) collate utf8_unicode_ci NOT NULL,
  `singer` varchar(40) collate utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `category` varchar(40) collate utf8_unicode_ci NOT NULL,
  `lyric` varchar(2000) collate utf8_unicode_ci NOT NULL,
  `listens` int(11) NOT NULL,
  `comments` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 
-- Dumping data for table `songs`
-- 

INSERT INTO `songs` (`id`, `name`, `singer`,`date`,`category`,`lyric`, `listens`, `comments`) VALUES 
(1, 'Ân Tình Trong Em 1', 'Châu Khải a ',"2000-11-16",'the loai 1', "lyric 1",11111, 221),
(2, 'Ân Tình Trong Em 2', 'Châu Khải b', "2000-11-16",'the loai 2',"lyric 2",22222, 222),
(3, 'Ân Tình Trong Em 3', 'Châu Khải c', "2000-11-16",'the loai 3',"lyric 3",33333, 223),
(4, 'Ân Tình Trong Em 4', 'Châu Khải d',"2000-11-16", 'the loai 4',"lyric 4",44444, 224);
--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;