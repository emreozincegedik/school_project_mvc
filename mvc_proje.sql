-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2021 at 02:39 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mvc_proje`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `teacherId` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `hour` int(11) NOT NULL,
  `pending` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `name`, `teacherId`, `day`, `hour`, `pending`) VALUES
(1, 'Computer Science', 9, 0, 9, 0),
(2, 'Computer Science 3', 9, 1, 9, 1),
(5, 'te', 9, 0, 10, 0),
(6, '7asd', 9, 1, 13, 1),
(7, 'asd', 9, 1, 10, 0),
(8, 'gg', 9, 2, 15, 1),
(9, 'te2', 10, 0, 9, 0),
(10, 'test123', 9, 0, 11, 1),
(11, 'teachertest123', 14, 2, 13, 0);

-- --------------------------------------------------------

--
-- Table structure for table `classesstd`
--

CREATE TABLE `classesstd` (
  `id` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `pending` int(11) NOT NULL DEFAULT 1,
  `exam` int(11) DEFAULT NULL,
  `final` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classesstd`
--

INSERT INTO `classesstd` (`id`, `studentId`, `classId`, `pending`, `exam`, `final`) VALUES
(1, 3, 1, 0, 15, 25),
(4, 3, 5, 0, 55, NULL),
(7, 3, 7, 0, NULL, NULL),
(8, 11, 5, 0, 45, 12),
(14, 13, 1, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `days`
--

CREATE TABLE `days` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `days`
--

INSERT INTO `days` (`id`, `name`) VALUES
(5, 'Friday'),
(1, 'Monday'),
(4, 'Thursday'),
(2, 'Tuesday'),
(3, 'Wednesday');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `level` int(11) NOT NULL,
  `pending` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `level`, `pending`, `name`) VALUES
(1, 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 2, 0, 'admin'),
(3, 'a', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, 0, 'a'),
(4, 'ab', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, 0, 'ab'),
(5, 'asd', '688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6', 0, 0, 'asd'),
(6, 'bb', '3b64db95cb55c763391c707108489ae18b4112d783300de38e033b4c98c3deaf', 0, 0, 'bb'),
(7, 'ccc', '64daa44ad493ff28a96effab6e77f1732a3d97d83241581b37dbd70a7a4900fe', 0, 0, 'ccc'),
(8, 'rrr', '12b0f0dcaefb10c02a83aa9adb025978ddb5512dc04eb39df6811c6a6bf9770c', 0, 0, 'rrr'),
(9, 'te', '2d6c9a90dd38f6852515274cde41a8cd8e7e1a7a053835334ec7e29f61b918dd', 1, 0, 'te'),
(10, 'te2', '49fbd6ed72e84d7b4476cd6b54ce9803a2ed547178ced7e243bb9ebc89ee145b', 1, 0, 'te2'),
(11, 'b', '3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d', 0, 0, 'b'),
(13, 'emreozincegedik', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 0, 0, 'Emre Özincegedik'),
(14, 'teachertest', '39709cce5dca536ad1134d54abf5a155bc0be2d924c37db2f710a7830f050027', 1, 0, 'teachertest');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacherId` (`teacherId`);

--
-- Indexes for table `classesstd`
--
ALTER TABLE `classesstd`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentId` (`studentId`),
  ADD KEY `classId` (`classId`);

--
-- Indexes for table `days`
--
ALTER TABLE `days`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `classesstd`
--
ALTER TABLE `classesstd`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `days`
--
ALTER TABLE `days`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`);

--
-- Constraints for table `classesstd`
--
ALTER TABLE `classesstd`
  ADD CONSTRAINT `classesstd_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`),
  ADD CONSTRAINT `classesstd_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
