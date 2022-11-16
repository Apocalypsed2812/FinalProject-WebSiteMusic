SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- 
-- Database: `final`
-- 

-- --------------------------------------------------------

-- 
-- Table structure for table `product`
-- 

CREATE TABLE `songs` (
  `id` int(11) NOT NULL,
  `name` varchar(40) collate utf8_unicode_ci NOT NULL,
  `singer` varchar(40) collate utf8_unicode_ci NOT NULL,
  `listens` int(11) NOT NULL,
  `comments` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 
-- Dumping data for table `product`
-- 

INSERT INTO `songs` (`id`, `name`, `singer`, `listens`, `comments`) VALUES 
(1, 'Ân Tình Trong Em 1', 'Châu Khải a ', 11111, 221),
(2, 'Ân Tình Trong Em 2', 'Châu Khải b', 22222, 222),
(3, 'Ân Tình Trong Em 3', 'Châu Khải c', 33333, 223),
(4, 'Ân Tình Trong Em 4', 'Châu Khải d', 44444, 224);
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