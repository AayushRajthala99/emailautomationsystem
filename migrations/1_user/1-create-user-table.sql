-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2022 at 03:47 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `emailautomationsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` int(1) DEFAULT NULL COMMENT '0 = Male\r\n1 = Female\r\n2 = Others',
  `address` varchar(255) DEFAULT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `bloodgroup` int(1) DEFAULT NULL COMMENT '0 = A positive (A+)\r\n1 = A negative (A-)\r\n2 = B positive (B+)\r\n3 = B negative (B-)\r\n4 = O positive (O+)\r\n5 = O negative (O-)\r\n6 = AB positive (AB+)\r\n7 = AB negative (AB-)',
  `citizenship` varchar(11) DEFAULT NULL,
  `citizenshiptype` int(1) DEFAULT NULL COMMENT '0 = Descendant\r\n1 = Birth\r\n2 = Adopted\r\n3 = Complimentary',
  `citizenshipissueddisctrict` varchar(100) DEFAULT NULL,
  `citizenshipissueddate` date DEFAULT NULL,
  `grandfathername` varchar(255) DEFAULT NULL,
  `fathername` varchar(255) DEFAULT NULL,
  `mothername` varchar(255) DEFAULT NULL,
  `spousename` varchar(255) DEFAULT NULL,
  `haslicense` tinyint(1) DEFAULT NULL COMMENT '1= "Yes", 0 = "No"',
  `licensecategory` varchar(10) DEFAULT NULL COMMENT '0 - (A) Motorcycle, Scooter, Moped\r\n1 - (B) Car, Jeep, Delivery Van\r\n2 - (C) Tempo, Auto Rickshaw\r\n3- (C1) E-Rickshaw\r\n4 - (D) Power Tilter\r\n5 - (E) Tractor\r\n6 - (K) Scooter, Moped',
  `licensenumber` varchar(13) DEFAULT NULL,
  `licenseissueddate` date DEFAULT NULL,
  `licenseexpirydate` date DEFAULT NULL,
  `licenseissueddistrict` varchar(100) DEFAULT NULL,
  `filledprofile` tinyint(1) DEFAULT NULL COMMENT '1= "Yes", 0 = "No"',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_citizenship_UNIQUE` (`citizenship`,`email`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;
