-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 11, 2022 at 08:24 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medicine`
--
CREATE DATABASE IF NOT EXISTS `medicine` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `medicine`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ID` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `userName` varchar(15) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`ID`, `firstName`, `lastName`, `email`, `userName`, `phoneNumber`, `password`) VALUES
(1, 'Natanim', 'Issa', 'natizkingdom@gmail.com', 'nati', '+251986447323', '$2a$08$Wk08851nOn09i4FYIKOodeSfUhK6UFtvafuOnfjwveUUyLagdLO/6');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `ID` int(11) NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `Email` varchar(30) NOT NULL,
  `PhoneNumber` varchar(20) NOT NULL,
  `Message` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`ID`, `FullName`, `Email`, `PhoneNumber`, `Message`) VALUES
(1, 'Natanim Issa', 'natizkingdom@gmail.com', '+251986447323', 'Hello this is a message sent to check if the database works.'),
(2, 'Mubarek Jenberu', 'medhanjenberu@gmail.com', '+251986447323', 'Hello every body this is to announce that the login has worked'),
(3, 'Rabia Hassen', 'biahassen@gmail.com', '+251986447323', 'This is a final debugging part of the program'),
(4, 'Natanim Issa', 'natizkingdom@gmail.com', '+251986447323', 'Testing part of the project'),
(5, 'Mubarek Jenberu', 'medhanjenberu@gmail.com', '+251986447323', 'Another testing part');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `ID` int(11) NOT NULL,
  `OrgName` varchar(30) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `FullName` varchar(50) DEFAULT NULL,
  `Role` varchar(20) DEFAULT NULL,
  `importDate` date DEFAULT NULL,
  `EntryPoint` varchar(30) DEFAULT NULL,
  `SubstanceName` varchar(50) DEFAULT NULL,
  `drugCode` varchar(30) DEFAULT NULL,
  `Concentration` varchar(30) DEFAULT NULL,
  `FormSubstance` varchar(20) DEFAULT NULL,
  `PackSize` varchar(20) DEFAULT NULL,
  `TotalPack` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`ID`, `OrgName`, `Address`, `FullName`, `Role`, `importDate`, `EntryPoint`, `SubstanceName`, `drugCode`, `Concentration`, `FormSubstance`, `PackSize`, `TotalPack`) VALUES
(2, 'YAD pharmceutical', 'Addis Ababa', 'Natanim Issa', 'Focal Person', '2022-02-26', 'Aseb Port', 'Paracetamol', 'PDg01', '500mg', 'Tablet', '100 Tablets per stri', 100),
(3, 'DAB', 'Addis Ababa', 'Natanim Issa', 'Focal Person', '2022-02-16', 'Metswa port', 'Amoxacilin', 'Amo001', '500mg', 'Tablet', '100 Tablets per stri', 50);

-- --------------------------------------------------------

--
-- Table structure for table `userprofile`
--

CREATE TABLE `userprofile` (
  `ID` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `username` varchar(20) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `region` varchar(30) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `orgName` varchar(30) DEFAULT NULL,
  `applicantRole` varchar(20) DEFAULT NULL,
  `Licence` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userprofile`
--

INSERT INTO `userprofile` (`ID`, `firstName`, `lastName`, `email`, `username`, `phoneNumber`, `password`, `region`, `city`, `address`, `orgName`, `applicantRole`, `Licence`) VALUES
(1, 'Natanim', 'Issa', 'natizkingdom@gmail.com', 'nati', '+251986447323', '$2a$08$LBMmqPxzaSc78uKsOXK7MOy6q2h4nzoFT/3PKu6EXIcb8kZcarSe2', 'Oromia', 'Adama', 'gfdgsdgds', 'YAD', 'Focal Person', '12345678'),
(2, 'Mubare', 'Jenberu', 'medhanjenberu@gmail.com', 'muba', '+251986447323', '$2a$08$Zva0lMRJt8s7EqYDc99y7ecQ4Qm2gV10/isF8h1ofhxDFKz9.mPb2', 'Amhara', 'Desse', 'Mekaneselam, House no. 2016', 'DAB', 'Owner', 'LI564329'),
(3, 'Mubarek', 'Jenberu', 'Muba@gmial.com', 'Muba_Jenberu', '+251948855112', '$2a$08$JshK2a/hOfTw.lQFEaVQcu0dF1KMNY49.kNs7emjV4hol9RCEVEvq', 'Addisababa', 'Addisketema', 'Woreda 9', 'YAD', 'Technical Manager', '1234567');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `userprofile`
--
ALTER TABLE `userprofile`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `userprofile`
--
ALTER TABLE `userprofile`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
