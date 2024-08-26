-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2024 at 07:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ams`
--

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240102171220-create-tbladmin.js'),
('20240102171441-create-tblclassteacher.js'),
('20240102172216-create-tblstudents.js'),
('20240104050046-create-tblattendance.js'),
('20240104050207-create-tblclass.js'),
('20240104050345-create-tblclassarms.js'),
('20240104050554-create-tblsessionterm.js'),
('20240104050706-create-tblterm.js'),
('20240106050316-create-tblsubject.js'),
('20240113052545-add_column_to_table.js'),
('20240113053510-delete_column_to_table.js'),
('20240120133800-rename-colum-admissionNo-to-admissionNumber-in-tblattendance.js'),
('20240120133842-rename-colum-admissionNo-to-admissionNumber-in-tblattendance.js'),
('20240226065022-drop_tblclassteacher.js'),
('20240226065301-drop_tblclassteacher.js'),
('20240226071859-drop_tblclassteacher.js'),
('20240226072043-create_tblclassteacher.js'),
('20240425173704-create-tblsubjteacher.js');

-- --------------------------------------------------------

--
-- Table structure for table `tbladmins`
--

CREATE TABLE `tbladmins` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `tokens` varchar(500) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tbladmins`
--

INSERT INTO `tbladmins` (`id`, `firstName`, `lastName`, `emailAddress`, `password`, `tokens`, `createdAt`, `updatedAt`) VALUES
(1, 'demo', 'demo', 'demo@mail.com', '$2a$10$MNThiLb4h/qpRWDGFLY5xeBgtaw64eScs5ol3N9TMoL2S3ZSuEL0q', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW5pc3RyYXRvciIsImVtYWlsQWRkcmVzcyI6ImRlbW9AbWFpbC5jb20iLCJ1c2VySWQiOjEsImlhdCI6MTcyNDYwNTE5OH0.qUALX1JRqRFp_62xm8JXy5Dn8mu_nXdlxhAYAVKXF_w', '2024-01-02 19:23:40', '2024-08-25 16:59:58');

-- --------------------------------------------------------

--
-- Table structure for table `tblattendances`
--

CREATE TABLE `tblattendances` (
  `id` int(11) NOT NULL,
  `admissionNumber` varchar(255) DEFAULT NULL,
  `classId` varchar(255) DEFAULT NULL,
  `classArmId` varchar(255) DEFAULT NULL,
  `subjId` varchar(255) NOT NULL,
  `sessionTermId` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `dateTimeTaken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblattendances`
--

INSERT INTO `tblattendances` (`id`, `admissionNumber`, `classId`, `classArmId`, `subjId`, `sessionTermId`, `status`, `dateTimeTaken`, `createdAt`, `updatedAt`) VALUES
(1, '21AI029', '2', '2', '1', '1', '1', '2024-01-16', '2024-01-16 13:19:45', '2024-01-16 13:31:34'),
(7, '21AI028', '1', '1', '4', '1', '1', '2024-01-16', '2024-01-21 16:48:35', '2024-01-21 16:48:35'),
(10, '21AI029', '2', '2', '1', '1', '1', '2024-01-19', '2024-01-21 18:29:14', '2024-01-21 18:29:14'),
(11, '21AI029', '2', '2', '1', '1', '0', '2024-01-19', '2024-01-21 18:29:14', '2024-01-21 18:29:14'),
(12, '21AI028', '1', '2', '4', '1', '1', '2024-05-16', '2024-05-15 19:16:48', '2024-05-15 19:17:56'),
(13, '21AI029', '2', '2', '', '1', '0', '2024-05-16', '2024-05-16 15:46:18', '2024-05-16 15:46:18'),
(14, '21AI029', '2', '2', '', '1', '0', '2024-05-17', '2024-05-17 04:53:55', '2024-05-17 04:53:55'),
(15, '21AI029', '2', '2', '', '1', '1', '2024-05-18', '2024-05-18 15:00:28', '2024-05-18 15:00:32'),
(16, '21AI028', '1', '2', '4', '1', '1', '2024-05-18', '2024-05-18 17:17:33', '2024-05-18 17:17:41'),
(17, '21AI028', '1', '2', '4', '1', '1', '2024-05-19', '2024-05-19 07:53:33', '2024-05-19 15:39:59'),
(18, '21AI029', '2', '2', '', '1', '0', '2024-05-19', '2024-05-19 15:38:14', '2024-05-19 15:38:14'),
(19, '21AI028', '1', '2', '4', '1', '1', '2024-05-21', '2024-05-21 18:01:47', '2024-05-21 18:04:50'),
(20, '21AI029', '2', '2', '1', '1', '1', '2024-05-26', '2024-05-25 20:31:52', '2024-05-25 20:31:52'),
(21, '21AI028', '1', '2', '4', '1', '0', '2024-05-26', '2024-05-26 11:26:40', '2024-05-26 11:26:40');

-- --------------------------------------------------------

--
-- Table structure for table `tblclassarms`
--

CREATE TABLE `tblclassarms` (
  `id` int(11) NOT NULL,
  `classId` varchar(255) DEFAULT NULL,
  `classArmName` varchar(255) DEFAULT NULL,
  `isAssigned` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblclassarms`
--

INSERT INTO `tblclassarms` (`id`, `classId`, `classArmName`, `isAssigned`, `createdAt`, `updatedAt`) VALUES
(1, '1', 'CS', '1', '2024-01-04 14:08:48', '2024-01-04 14:08:48'),
(2, '1', 'AI', '1', '2024-01-04 14:08:48', '2024-01-05 16:07:50'),
(3, '2', 'CS', '1', '2024-01-04 14:09:18', '2024-01-04 14:09:18'),
(4, '3', 'ME', '1', '2024-01-04 14:09:18', '2024-01-04 14:09:18'),
(8, '4', 'AI', '0', '2024-02-25 18:17:49', '2024-03-31 18:43:01');

-- --------------------------------------------------------

--
-- Table structure for table `tblclasses`
--

CREATE TABLE `tblclasses` (
  `id` int(11) NOT NULL,
  `className` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblclasses`
--

INSERT INTO `tblclasses` (`id`, `className`, `createdAt`, `updatedAt`) VALUES
(1, 'First Year', '2024-02-25 18:02:52', '2024-02-25 18:02:52'),
(2, 'Second Year', '2024-02-25 18:03:05', '2024-02-25 18:03:05'),
(3, 'Third Year', '2024-02-25 18:03:17', '2024-02-25 18:03:17'),
(4, 'Fourth Year', '2024-02-25 18:03:29', '2024-02-25 18:03:29'),
(5, 'Fifth year', '2024-03-18 13:12:48', '2024-03-18 13:12:48');

-- --------------------------------------------------------

--
-- Table structure for table `tblclassteachers`
--

CREATE TABLE `tblclassteachers` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `tokens` varchar(255) DEFAULT NULL,
  `classId` varchar(255) DEFAULT NULL,
  `classArmId` varchar(255) DEFAULT NULL,
  `phoneNo` varchar(255) DEFAULT NULL,
  `subjId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblclassteachers`
--

INSERT INTO `tblclassteachers` (`id`, `firstName`, `lastName`, `emailAddress`, `password`, `tokens`, `classId`, `classArmId`, `phoneNo`, `subjId`, `createdAt`, `updatedAt`) VALUES
(1, 'Kunal', 'Ch', 'kunal@mail.com', '$2a$10$2WH1/iQURZR.fuKhY8GL1eJAKh2xCSA9BSO0hVt3gm.y9.FSe5dgO', NULL, '1', '2', '123', '1', '2024-02-26 07:39:23', '2024-02-26 07:39:23'),
(2, 'Abhimanyu', 'Meel', 'meel@mail.com', '$2a$10$OrLpflVbABs1wq8rrX3p5eBpg1CNGa4iCZE7PQsWVvsto9LnWlrPy', NULL, '1', '2', '123', '1', '2024-02-26 09:06:57', '2024-02-26 09:06:57'),
(3, 'Nill', 'Saini', 'saini@mail.com', '$2a$10$zf6bdnwjisW/DGYypNENfe/YukF/IBVoSt5.fJKyIG2wg4j/CsHU.', NULL, '2', '2', '123', '1', '2024-02-26 09:10:42', '2024-02-26 09:10:42'),
(23, 'test5', 'test5', 'test5@mail.com', '$2a$10$Sv104ATcTn1ihic3NSZxxeLbZJXL58A9Yy/H9gV850MdspF0hGH8u', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQ2xhc3NUZWFjaGVyIiwiZW1haWxBZGRyZXNzIjoidGVzdDVAbWFpbC5jb20iLCJ1c2VySWQiOjIzLCJpYXQiOjE3MTYxMzMwNTd9.bJoX2ucKHeEPm-yqnEmK7tyetfG7oQ-R9NNxvd3ngDY', '2', '2', NULL, '1', '2024-04-01 17:54:41', '2024-05-19 15:37:37');

-- --------------------------------------------------------

--
-- Table structure for table `tblsessionterms`
--

CREATE TABLE `tblsessionterms` (
  `id` int(11) NOT NULL,
  `sessionName` varchar(150) NOT NULL,
  `termId` int(50) NOT NULL,
  `isActive` int(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblsessionterms`
--

INSERT INTO `tblsessionterms` (`id`, `sessionName`, `termId`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, '2021-2025', 1, 1, '2024-03-31 14:10:46', '2024-03-31 14:10:46'),
(2, '2021-2025', 2, 0, '2024-03-31 14:10:46', '2024-03-31 14:10:46');

-- --------------------------------------------------------

--
-- Table structure for table `tblstudents`
--

CREATE TABLE `tblstudents` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `admissionNumber` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phoneNo` int(11) DEFAULT NULL,
  `classId` int(11) NOT NULL,
  `classArmId` int(11) NOT NULL,
  `tokens` varchar(500) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblstudents`
--

INSERT INTO `tblstudents` (`id`, `firstName`, `lastName`, `admissionNumber`, `emailAddress`, `password`, `phoneNo`, `classId`, `classArmId`, `tokens`, `createdAt`, `updatedAt`) VALUES
(2, 'demo2', 'demo2', '21AI028', 'demo2@mail.com', 'demo2demo2', 123, 1, 2, NULL, '2024-01-04 07:09:52', '2024-01-13 13:18:07'),
(11, 'demostudent', 'demo', '21AI029', 'demostudent@mail.com', '$2a$10$o8ON.BJKWY1uJYn1tztl0eLg6TGOpOvY4RyIFPxkBuZHn103s0DMe', 123, 2, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU3R1ZGVudCIsImVtYWlsQWRkcmVzcyI6ImRlbW9zdHVkZW50QG1haWwuY29tIiwidXNlcklkIjoxMSwiaWF0IjoxNzIyOTUyMzA5fQ.MIazzlTA9qCGMolaMzZGglejitZbi4IcIMIJVwG_zCA', '2024-02-11 15:27:53', '2024-08-06 13:51:49');

-- --------------------------------------------------------

--
-- Table structure for table `tblsubjects`
--

CREATE TABLE `tblsubjects` (
  `id` int(11) NOT NULL,
  `subjName` varchar(255) DEFAULT NULL,
  `classId` varchar(255) NOT NULL,
  `classArmId` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblsubjects`
--

INSERT INTO `tblsubjects` (`id`, `subjName`, `classId`, `classArmId`, `createdAt`, `updatedAt`) VALUES
(1, 'Engg Maths', '2', '2', '2024-01-06 06:05:21', '2024-01-06 06:05:21'),
(2, 'Engg Physics', '2', '2', '2024-01-06 06:05:21', '2024-01-06 06:05:21'),
(3, 'Engg Chemistry', '2', '2', '2024-01-06 06:06:07', '2024-01-06 06:06:07'),
(4, 'Mechanical Engg', '2', '2', '2024-01-06 06:06:07', '2024-01-06 06:06:07');

-- --------------------------------------------------------

--
-- Table structure for table `tblsubjteachers`
--

CREATE TABLE `tblsubjteachers` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `tokens` varchar(255) DEFAULT NULL,
  `classId` varchar(255) DEFAULT NULL,
  `classArmId` varchar(255) DEFAULT NULL,
  `phoneNo` varchar(255) DEFAULT NULL,
  `subjId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblsubjteachers`
--

INSERT INTO `tblsubjteachers` (`id`, `firstName`, `lastName`, `emailAddress`, `password`, `tokens`, `classId`, `classArmId`, `phoneNo`, `subjId`, `createdAt`, `updatedAt`) VALUES
(1, 'subj', 'teacher', 'subjteacher@mail.com', '$2a$10$h.4X3y/WpVONBtCr5oeXp.gEzscGwx2J0RdOV7blzwjDpctfGneAG', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU3ViamVjdFRlYWNoZXIiLCJlbWFpbEFkZHJlc3MiOiJzdWJqdGVhY2hlckBtYWlsLmNvbSIsInVzZXJJZCI6MSwiaWF0IjoxNzE2NzQ2NTU4fQ.NPdrTHjz01W0mh4wUBxeQWbDnDEyOm0d-1_zME__LmQ', '1', '2', '123', '4', '2024-05-15 19:10:17', '2024-05-26 18:02:38');

-- --------------------------------------------------------

--
-- Table structure for table `tblterms`
--

CREATE TABLE `tblterms` (
  `id` int(11) NOT NULL,
  `termName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tblterms`
--

INSERT INTO `tblterms` (`id`, `termName`, `createdAt`, `updatedAt`) VALUES
(1, 'Even', '2024-01-04 14:11:12', '2024-01-04 14:11:12'),
(2, 'Odd', '2024-01-04 14:11:12', '2024-01-04 14:11:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tbladmins`
--
ALTER TABLE `tbladmins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `emailAddress` (`emailAddress`);

--
-- Indexes for table `tblattendances`
--
ALTER TABLE `tblattendances`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblclassarms`
--
ALTER TABLE `tblclassarms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblclasses`
--
ALTER TABLE `tblclasses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblclassteachers`
--
ALTER TABLE `tblclassteachers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblsessionterms`
--
ALTER TABLE `tblsessionterms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblstudents`
--
ALTER TABLE `tblstudents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblsubjects`
--
ALTER TABLE `tblsubjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblsubjteachers`
--
ALTER TABLE `tblsubjteachers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblterms`
--
ALTER TABLE `tblterms`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbladmins`
--
ALTER TABLE `tbladmins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tblattendances`
--
ALTER TABLE `tblattendances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tblclassarms`
--
ALTER TABLE `tblclassarms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tblclasses`
--
ALTER TABLE `tblclasses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tblclassteachers`
--
ALTER TABLE `tblclassteachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `tblsessionterms`
--
ALTER TABLE `tblsessionterms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tblstudents`
--
ALTER TABLE `tblstudents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tblsubjects`
--
ALTER TABLE `tblsubjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tblsubjteachers`
--
ALTER TABLE `tblsubjteachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tblterms`
--
ALTER TABLE `tblterms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
