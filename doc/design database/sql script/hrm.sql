-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2015 at 06:27 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `hrm`
--

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE IF NOT EXISTS `client` (
  `ClientID` int(11) unsigned NOT NULL COMMENT 'Client ID',
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT 'Name',
  `Address` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Address',
  `Phone` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Phone number',
  `Email` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'Email',
  `StartDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDate` datetime DEFAULT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Client Information';

-- --------------------------------------------------------

--
-- Table structure for table `globalpermission`
--

CREATE TABLE IF NOT EXISTS `globalpermission` (
  `GPermissionID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `globaluserpermission`
--

CREATE TABLE IF NOT EXISTS `globaluserpermission` (
  `GPermissionID` int(10) unsigned NOT NULL,
  `UserID` int(10) unsigned NOT NULL,
  `StartDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE IF NOT EXISTS `permission` (
  `PermissionID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissioninrole`
--

CREATE TABLE IF NOT EXISTS `permissioninrole` (
  `PermissionID` int(10) unsigned NOT NULL,
  `RoleID` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `ProjectID` int(11) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `StartDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDate` datetime DEFAULT NULL,
  `ProjectOwner` int(11) unsigned NOT NULL,
  `ClientID` int(11) DEFAULT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `RoleID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sprint`
--

CREATE TABLE IF NOT EXISTS `sprint` (
  `SprintID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `StartDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDate` datetime NOT NULL,
  `StateID` int(11) unsigned NOT NULL,
  `ProjectID` int(11) unsigned NOT NULL,
  `PlanVelocity` float DEFAULT NULL,
  `PlanEst` float DEFAULT NULL,
  `TaskEst` float DEFAULT NULL,
  `Actuals` float DEFAULT NULL,
  `ToDo` float DEFAULT NULL,
  `Note` text COLLATE utf8_unicode_ci,
  `Active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Sprint';

-- --------------------------------------------------------

--
-- Table structure for table `sprintstate`
--

CREATE TABLE IF NOT EXISTS `sprintstate` (
  `SprintStateID` int(11) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Sprint State';

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE IF NOT EXISTS `status` (
  `StatusID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Status';

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE IF NOT EXISTS `task` (
  `TaskID` int(11) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `StateID` int(11) unsigned NOT NULL,
  `TaskEst` float unsigned DEFAULT NULL,
  `ToDo` float unsigned DEFAULT '0',
  `Actual` float unsigned DEFAULT '0',
  `Note` text COLLATE utf8_unicode_ci,
  `Onwer` int(11) unsigned DEFAULT NULL,
  `ProjectID` int(11) unsigned NOT NULL,
  `StartDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDate` datetime DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL COMMENT '0 is inactive, 1 is active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `taskattachment`
--

CREATE TABLE IF NOT EXISTS `taskattachment` (
  `TaskAttachmentID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `FilePath` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `TaskID` int(10) unsigned NOT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `CreatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Task Attachment';

-- --------------------------------------------------------

--
-- Table structure for table `taskrevision`
--

CREATE TABLE IF NOT EXISTS `taskrevision` (
  `RevisionID` int(10) unsigned NOT NULL,
  `Description` text COLLATE utf8_unicode_ci NOT NULL,
  `AuthorID` int(10) unsigned NOT NULL,
  `TaskID` int(10) unsigned NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Task Revision';

-- --------------------------------------------------------

--
-- Table structure for table `taskstate`
--

CREATE TABLE IF NOT EXISTS `taskstate` (
  `TaskStateID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `Parent` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `taskstatus`
--

CREATE TABLE IF NOT EXISTS `taskstatus` (
  `StatusID` int(10) unsigned NOT NULL,
  `TaskID` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Task Status';

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `UserID` int(10) unsigned NOT NULL,
  `FullName` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `UserName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Password` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Active` tinyint(1) NOT NULL,
  `LastLogin` datetime DEFAULT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedByUserID` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userassign`
--

CREATE TABLE IF NOT EXISTS `userassign` (
  `UserAssignID` int(10) unsigned NOT NULL,
  `UserID` int(10) unsigned NOT NULL,
  `RoleID` int(10) unsigned NOT NULL,
  `ProjectID` int(10) unsigned NOT NULL,
  `StartDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDate` datetime DEFAULT NULL,
  `Retire` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userstory`
--

CREATE TABLE IF NOT EXISTS `userstory` (
  `UserStoryID` int(11) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Owner` int(11) unsigned DEFAULT NULL,
  `ParentID` int(11) unsigned DEFAULT NULL,
  `SprintID` int(11) unsigned DEFAULT NULL,
  `StateID` int(11) unsigned NOT NULL,
  `BusinessValue` int(11) unsigned DEFAULT '0',
  `PlanEst` float unsigned DEFAULT NULL,
  `TaskEst` float unsigned DEFAULT NULL,
  `ToDo` float unsigned DEFAULT NULL,
  `Actual` float unsigned DEFAULT NULL,
  `Note` text COLLATE utf8_unicode_ci,
  `ProjectID` int(11) unsigned NOT NULL,
  `Point` float unsigned DEFAULT NULL,
  `StartDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDate` datetime DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userstoryattachment`
--

CREATE TABLE IF NOT EXISTS `userstoryattachment` (
  `USAttachmentID` int(11) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `FilePath` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `UserStoryID` int(11) unsigned NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='User Story Attachment';

-- --------------------------------------------------------

--
-- Table structure for table `userstoryrevision`
--

CREATE TABLE IF NOT EXISTS `userstoryrevision` (
  `RevisionID` int(10) unsigned NOT NULL,
  `Description` text COLLATE utf8_unicode_ci NOT NULL,
  `AuthorID` int(10) unsigned NOT NULL,
  `UserStoryID` int(10) unsigned NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='User Story Revision';

-- --------------------------------------------------------

--
-- Table structure for table `userstorystate`
--

CREATE TABLE IF NOT EXISTS `userstorystate` (
  `USStateID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci NOT NULL,
  `Parent` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='User story state';

-- --------------------------------------------------------

--
-- Table structure for table `userstorystatus`
--

CREATE TABLE IF NOT EXISTS `userstorystatus` (
  `StatusID` int(10) unsigned NOT NULL,
  `USerStoryID` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='User Story Status';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`ClientID`);

--
-- Indexes for table `globalpermission`
--
ALTER TABLE `globalpermission`
  ADD PRIMARY KEY (`GPermissionID`);

--
-- Indexes for table `globaluserpermission`
--
ALTER TABLE `globaluserpermission`
  ADD PRIMARY KEY (`GPermissionID`,`UserID`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`PermissionID`);

--
-- Indexes for table `permissioninrole`
--
ALTER TABLE `permissioninrole`
  ADD PRIMARY KEY (`PermissionID`,`RoleID`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`ProjectID`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`RoleID`);

--
-- Indexes for table `sprint`
--
ALTER TABLE `sprint`
  ADD PRIMARY KEY (`SprintID`);

--
-- Indexes for table `sprintstate`
--
ALTER TABLE `sprintstate`
  ADD PRIMARY KEY (`SprintStateID`) COMMENT 'Sprint State ID';

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`StatusID`) COMMENT 'Status ID';

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`TaskID`) COMMENT 'Task ID';

--
-- Indexes for table `taskattachment`
--
ALTER TABLE `taskattachment`
  ADD PRIMARY KEY (`TaskAttachmentID`) COMMENT 'Task Attachment ID';

--
-- Indexes for table `taskrevision`
--
ALTER TABLE `taskrevision`
  ADD PRIMARY KEY (`RevisionID`) COMMENT 'Revision ID';

--
-- Indexes for table `taskstate`
--
ALTER TABLE `taskstate`
  ADD PRIMARY KEY (`TaskStateID`) COMMENT 'Task State ID';

--
-- Indexes for table `taskstatus`
--
ALTER TABLE `taskstatus`
  ADD PRIMARY KEY (`StatusID`,`TaskID`) COMMENT 'Status ID';

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `userassign`
--
ALTER TABLE `userassign`
  ADD PRIMARY KEY (`UserAssignID`);

--
-- Indexes for table `userstory`
--
ALTER TABLE `userstory`
  ADD PRIMARY KEY (`UserStoryID`) COMMENT 'User Story ID';

--
-- Indexes for table `userstoryattachment`
--
ALTER TABLE `userstoryattachment`
  ADD PRIMARY KEY (`USAttachmentID`) COMMENT 'User story attachment ID';

--
-- Indexes for table `userstoryrevision`
--
ALTER TABLE `userstoryrevision`
  ADD PRIMARY KEY (`RevisionID`) COMMENT 'Revision ID';

--
-- Indexes for table `userstorystate`
--
ALTER TABLE `userstorystate`
  ADD PRIMARY KEY (`USStateID`) COMMENT 'User story ID';

--
-- Indexes for table `userstorystatus`
--
ALTER TABLE `userstorystatus`
  ADD PRIMARY KEY (`USerStoryID`) COMMENT 'User Story ID';

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `ClientID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Client ID';
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
