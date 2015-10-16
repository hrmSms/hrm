-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2015 at 12:18 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `hrm`
--
CREATE DATABASE IF NOT EXISTS `hrm` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `hrm`;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--
-- Creation: Jul 30, 2015 at 10:16 AM
--

DROP TABLE IF EXISTS `client`;
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

--
-- RELATIONS FOR TABLE `client`:
--

-- --------------------------------------------------------

--
-- Table structure for table `globalpermission`
--
-- Creation: Jul 30, 2015 at 10:16 AM
--

DROP TABLE IF EXISTS `globalpermission`;
CREATE TABLE IF NOT EXISTS `globalpermission` (
  `GPermissionID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONS FOR TABLE `globalpermission`:
--

-- --------------------------------------------------------

--
-- Table structure for table `globaluserpermission`
--
-- Creation: Jul 27, 2015 at 03:35 AM
--

DROP TABLE IF EXISTS `globaluserpermission`;
CREATE TABLE IF NOT EXISTS `globaluserpermission` (
  `GPermissionID` int(10) unsigned NOT NULL,
  `UserID` int(10) unsigned NOT NULL,
  `StartDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONS FOR TABLE `globaluserpermission`:
--   `GPermissionID`
--       `globalpermission` -> `GPermissionID`
--   `UserID`
--       `user` -> `UserID`
--

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--
-- Creation: Jul 30, 2015 at 10:16 AM
--

DROP TABLE IF EXISTS `permission`;
CREATE TABLE IF NOT EXISTS `permission` (
  `PermissionID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONS FOR TABLE `permission`:
--

-- --------------------------------------------------------

--
-- Table structure for table `permissioninrole`
--
-- Creation: Jul 27, 2015 at 03:39 AM
--

DROP TABLE IF EXISTS `permissioninrole`;
CREATE TABLE IF NOT EXISTS `permissioninrole` (
  `PermissionID` int(10) unsigned NOT NULL,
  `RoleID` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONS FOR TABLE `permissioninrole`:
--   `PermissionID`
--       `permission` -> `PermissionID`
--   `RoleID`
--       `role` -> `RoleID`
--

-- --------------------------------------------------------

--
-- Table structure for table `project`
--
-- Creation: Jul 30, 2015 at 10:07 AM
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE IF NOT EXISTS `project` (
  `ProjectID` int(11) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `StartDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDate` datetime DEFAULT NULL,
  `ProjectOwner` int(11) unsigned NOT NULL,
  `ClientID` int(11) unsigned DEFAULT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONS FOR TABLE `project`:
--   `ClientID`
--       `client` -> `ClientID`
--   `ProjectOwner`
--       `user` -> `UserID`
--

-- --------------------------------------------------------

--
-- Table structure for table `role`
--
-- Creation: Jul 30, 2015 at 10:17 AM
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `RoleID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONS FOR TABLE `role`:
--

-- --------------------------------------------------------

--
-- Table structure for table `sprint`
--
-- Creation: Jul 30, 2015 at 10:17 AM
--

DROP TABLE IF EXISTS `sprint`;
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

--
-- RELATIONS FOR TABLE `sprint`:
--   `SprintID`
--       `project` -> `ProjectID`
--   `StateID`
--       `sprintstate` -> `SprintStateID`
--

-- --------------------------------------------------------

--
-- Table structure for table `sprintstate`
--
-- Creation: Jul 27, 2015 at 03:23 AM
--

DROP TABLE IF EXISTS `sprintstate`;
CREATE TABLE IF NOT EXISTS `sprintstate` (
  `SprintStateID` int(11) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Sprint State';

--
-- RELATIONS FOR TABLE `sprintstate`:
--

-- --------------------------------------------------------

--
-- Table structure for table `status`
--
-- Creation: Jul 27, 2015 at 03:07 AM
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `StatusID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Status';

--
-- RELATIONS FOR TABLE `status`:
--

-- --------------------------------------------------------

--
-- Table structure for table `task`
--
-- Creation: Jul 30, 2015 at 10:17 AM
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE IF NOT EXISTS `task` (
  `TaskID` int(11) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `StateID` int(11) unsigned NOT NULL,
  `TaskEst` float unsigned DEFAULT NULL,
  `ToDo` float unsigned DEFAULT '0',
  `Actual` float unsigned DEFAULT '0',
  `Note` text COLLATE utf8_unicode_ci,
  `Owner` int(11) unsigned DEFAULT NULL,
  `UserStoryID` int(10) unsigned NOT NULL,
  `ProjectID` int(11) unsigned NOT NULL,
  `StartDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDate` datetime DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL COMMENT '0 is inactive, 1 is active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONS FOR TABLE `task`:
--   `ProjectID`
--       `project` -> `ProjectID`
--   `StateID`
--       `taskstate` -> `TaskStateID`
--   `Owner`
--       `user` -> `UserID`
--   `UserStoryID`
--       `userstory` -> `UserStoryID`
--

-- --------------------------------------------------------

--
-- Table structure for table `taskattachment`
--
-- Creation: Jul 27, 2015 at 03:07 AM
--

DROP TABLE IF EXISTS `taskattachment`;
CREATE TABLE IF NOT EXISTS `taskattachment` (
  `TaskAttachmentID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `FilePath` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `TaskID` int(10) unsigned NOT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `CreatedDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Task Attachment';

--
-- RELATIONS FOR TABLE `taskattachment`:
--   `TaskID`
--       `task` -> `TaskID`
--

-- --------------------------------------------------------

--
-- Table structure for table `taskrevision`
--
-- Creation: Jul 27, 2015 at 03:07 AM
--

DROP TABLE IF EXISTS `taskrevision`;
CREATE TABLE IF NOT EXISTS `taskrevision` (
  `RevisionID` int(10) unsigned NOT NULL,
  `Description` text COLLATE utf8_unicode_ci NOT NULL,
  `AuthorID` int(10) unsigned NOT NULL,
  `TaskID` int(10) unsigned NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Task Revision';

--
-- RELATIONS FOR TABLE `taskrevision`:
--   `TaskID`
--       `task` -> `TaskID`
--

-- --------------------------------------------------------

--
-- Table structure for table `taskstate`
--
-- Creation: Jul 27, 2015 at 03:07 AM
--

DROP TABLE IF EXISTS `taskstate`;
CREATE TABLE IF NOT EXISTS `taskstate` (
  `TaskStateID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `Parent` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONS FOR TABLE `taskstate`:
--   `Parent`
--       `taskstate` -> `TaskStateID`
--

-- --------------------------------------------------------

--
-- Table structure for table `taskstatus`
--
-- Creation: Jul 27, 2015 at 03:07 AM
--

DROP TABLE IF EXISTS `taskstatus`;
CREATE TABLE IF NOT EXISTS `taskstatus` (
  `StatusID` int(10) unsigned NOT NULL,
  `TaskID` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='Task Status';

--
-- RELATIONS FOR TABLE `taskstatus`:
--   `StatusID`
--       `status` -> `StatusID`
--   `TaskID`
--       `task` -> `TaskID`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--
-- Creation: Jul 30, 2015 at 10:17 AM
--

DROP TABLE IF EXISTS `user`;
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

--
-- RELATIONS FOR TABLE `user`:
--

-- --------------------------------------------------------

--
-- Table structure for table `userassign`
--
-- Creation: Jul 29, 2015 at 07:58 AM
--

DROP TABLE IF EXISTS `userassign`;
CREATE TABLE IF NOT EXISTS `userassign` (
  `UserAssignID` int(10) unsigned NOT NULL,
  `UserID` int(10) unsigned NOT NULL,
  `RoleID` int(10) unsigned NOT NULL,
  `ProjectID` int(10) unsigned NOT NULL,
  `StartDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDate` datetime DEFAULT NULL,
  `Retire` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELATIONS FOR TABLE `userassign`:
--   `ProjectID`
--       `project` -> `ProjectID`
--   `RoleID`
--       `role` -> `RoleID`
--   `UserID`
--       `user` -> `UserID`
--

-- --------------------------------------------------------

--
-- Table structure for table `userstory`
--
-- Creation: Jul 30, 2015 at 10:17 AM
--

DROP TABLE IF EXISTS `userstory`;
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

--
-- RELATIONS FOR TABLE `userstory`:
--   `ParentID`
--       `userstory` -> `UserStoryID`
--   `ProjectID`
--       `project` -> `ProjectID`
--   `SprintID`
--       `sprint` -> `SprintID`
--   `Owner`
--       `user` -> `UserID`
--   `StateID`
--       `userstorystate` -> `USStateID`
--

-- --------------------------------------------------------

--
-- Table structure for table `userstoryattachment`
--
-- Creation: Jul 27, 2015 at 03:07 AM
--

DROP TABLE IF EXISTS `userstoryattachment`;
CREATE TABLE IF NOT EXISTS `userstoryattachment` (
  `USAttachmentID` int(11) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `FilePath` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci,
  `UserStoryID` int(11) unsigned NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='User Story Attachment';

--
-- RELATIONS FOR TABLE `userstoryattachment`:
--   `UserStoryID`
--       `userstory` -> `UserStoryID`
--

-- --------------------------------------------------------

--
-- Table structure for table `userstoryrevision`
--
-- Creation: Jul 27, 2015 at 03:07 AM
--

DROP TABLE IF EXISTS `userstoryrevision`;
CREATE TABLE IF NOT EXISTS `userstoryrevision` (
  `RevisionID` int(10) unsigned NOT NULL,
  `Description` text COLLATE utf8_unicode_ci NOT NULL,
  `AuthorID` int(10) unsigned NOT NULL,
  `UserStoryID` int(10) unsigned NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='User Story Revision';

--
-- RELATIONS FOR TABLE `userstoryrevision`:
--   `UserStoryID`
--       `userstory` -> `UserStoryID`
--

-- --------------------------------------------------------

--
-- Table structure for table `userstorystate`
--
-- Creation: Jul 29, 2015 at 06:47 AM
--

DROP TABLE IF EXISTS `userstorystate`;
CREATE TABLE IF NOT EXISTS `userstorystate` (
  `USStateID` int(10) unsigned NOT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Description` text COLLATE utf8_unicode_ci NOT NULL,
  `Parent` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='User story state';

--
-- RELATIONS FOR TABLE `userstorystate`:
--   `Parent`
--       `userstorystate` -> `USStateID`
--

-- --------------------------------------------------------

--
-- Table structure for table `userstorystatus`
--
-- Creation: Jul 29, 2015 at 07:21 AM
--

DROP TABLE IF EXISTS `userstorystatus`;
CREATE TABLE IF NOT EXISTS `userstorystatus` (
  `StatusID` int(10) unsigned NOT NULL,
  `UserStoryID` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='User Story Status';

--
-- RELATIONS FOR TABLE `userstorystatus`:
--   `StatusID`
--       `status` -> `StatusID`
--   `UserStoryID`
--       `userstory` -> `UserStoryID`
--

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`ClientID`), ADD KEY `index_client_name` (`Name`) USING BTREE, ADD KEY `index_client_email` (`Email`) USING BTREE;

--
-- Indexes for table `globalpermission`
--
ALTER TABLE `globalpermission`
  ADD PRIMARY KEY (`GPermissionID`), ADD KEY `index_globalpermission_name` (`Name`) USING BTREE;

--
-- Indexes for table `globaluserpermission`
--
ALTER TABLE `globaluserpermission`
  ADD PRIMARY KEY (`GPermissionID`,`UserID`), ADD KEY `fk_globalUserPermission_user` (`UserID`);

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`PermissionID`), ADD KEY `index_permission_name` (`Name`) USING BTREE;

--
-- Indexes for table `permissioninrole`
--
ALTER TABLE `permissioninrole`
  ADD PRIMARY KEY (`PermissionID`,`RoleID`), ADD KEY `fk_permissionInRole_role` (`RoleID`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`ProjectID`), ADD KEY `fk_project_client` (`ClientID`), ADD KEY `fk_project_user` (`ProjectOwner`), ADD KEY `index_project_name` (`Name`) USING BTREE;

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`RoleID`), ADD KEY `index_role_name` (`Name`) USING BTREE;

--
-- Indexes for table `sprint`
--
ALTER TABLE `sprint`
  ADD PRIMARY KEY (`SprintID`), ADD KEY `fk_sprint_sprintState` (`StateID`), ADD KEY `index_sprint_name` (`Name`) USING BTREE;

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
  ADD PRIMARY KEY (`TaskID`) COMMENT 'Task ID', ADD KEY `fk_task_taskState` (`StateID`), ADD KEY `fk_task_user` (`Owner`), ADD KEY `fk_task_userstory` (`UserStoryID`), ADD KEY `fk_task_project` (`ProjectID`), ADD KEY `index_task_name` (`Name`) USING BTREE;

--
-- Indexes for table `taskattachment`
--
ALTER TABLE `taskattachment`
  ADD PRIMARY KEY (`TaskAttachmentID`) COMMENT 'Task Attachment ID', ADD KEY `fk_taskAttachment_task` (`TaskID`);

--
-- Indexes for table `taskrevision`
--
ALTER TABLE `taskrevision`
  ADD PRIMARY KEY (`RevisionID`) COMMENT 'Revision ID', ADD KEY `fk_taskRevison_task` (`TaskID`);

--
-- Indexes for table `taskstate`
--
ALTER TABLE `taskstate`
  ADD PRIMARY KEY (`TaskStateID`) COMMENT 'Task State ID', ADD KEY `fk_taskState_taskState` (`Parent`);

--
-- Indexes for table `taskstatus`
--
ALTER TABLE `taskstatus`
  ADD PRIMARY KEY (`StatusID`,`TaskID`) COMMENT 'Status ID', ADD KEY `fk_taskStatus_task` (`TaskID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`), ADD KEY `index_user_fullname` (`FullName`(100)) USING BTREE, ADD KEY `index_user_email` (`Email`) USING BTREE, ADD KEY `index_user_username` (`UserName`) USING BTREE;

--
-- Indexes for table `userassign`
--
ALTER TABLE `userassign`
  ADD PRIMARY KEY (`UserAssignID`), ADD KEY `fk_userAssign_user` (`UserID`), ADD KEY `fk_userAssign_project` (`ProjectID`), ADD KEY `fk_userAssign_role` (`RoleID`);

--
-- Indexes for table `userstory`
--
ALTER TABLE `userstory`
  ADD PRIMARY KEY (`UserStoryID`) COMMENT 'User Story ID', ADD KEY `fk_userstory_user` (`Owner`), ADD KEY `fk_userstory_sprint` (`SprintID`), ADD KEY `fk_userstory_parent` (`ParentID`), ADD KEY `fk_userstory_userStoryState` (`StateID`), ADD KEY `fk_userstory_project` (`ProjectID`), ADD KEY `index_userstory_name` (`Name`) USING BTREE;

--
-- Indexes for table `userstoryattachment`
--
ALTER TABLE `userstoryattachment`
  ADD PRIMARY KEY (`USAttachmentID`) COMMENT 'User story attachment ID', ADD KEY `fk_userstoryAttachment_userstory` (`UserStoryID`);

--
-- Indexes for table `userstoryrevision`
--
ALTER TABLE `userstoryrevision`
  ADD PRIMARY KEY (`RevisionID`) COMMENT 'Revision ID', ADD KEY `fk_userstoryRevision_userstory` (`UserStoryID`);

--
-- Indexes for table `userstorystate`
--
ALTER TABLE `userstorystate`
  ADD PRIMARY KEY (`USStateID`) COMMENT 'User story ID', ADD KEY `fk_userstoryState_userstoryState` (`Parent`);

--
-- Indexes for table `userstorystatus`
--
ALTER TABLE `userstorystatus`
  ADD PRIMARY KEY (`UserStoryID`) COMMENT 'User Story ID', ADD KEY `fk_userstoryStatus_Status` (`StatusID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `ClientID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Client ID';
--
-- Constraints for dumped tables
--

--
-- Constraints for table `globaluserpermission`
--
ALTER TABLE `globaluserpermission`
ADD CONSTRAINT `fk_globalUserPermission_globalPermission` FOREIGN KEY (`GPermissionID`) REFERENCES `globalpermission` (`GPermissionID`) ON DELETE NO ACTION ON UPDATE CASCADE,
ADD CONSTRAINT `fk_globalUserPermission_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `permissioninrole`
--
ALTER TABLE `permissioninrole`
ADD CONSTRAINT `fk_permissionInRole_permission` FOREIGN KEY (`PermissionID`) REFERENCES `permission` (`PermissionID`) ON DELETE NO ACTION ON UPDATE CASCADE,
ADD CONSTRAINT `fk_permissionInRole_role` FOREIGN KEY (`RoleID`) REFERENCES `role` (`RoleID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
ADD CONSTRAINT `fk_project_client` FOREIGN KEY (`ClientID`) REFERENCES `client` (`ClientID`) ON DELETE SET NULL ON UPDATE CASCADE,
ADD CONSTRAINT `fk_project_user` FOREIGN KEY (`ProjectOwner`) REFERENCES `user` (`UserID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `sprint`
--
ALTER TABLE `sprint`
ADD CONSTRAINT `fk_sprint_project` FOREIGN KEY (`SprintID`) REFERENCES `project` (`ProjectID`) ON DELETE NO ACTION ON UPDATE CASCADE,
ADD CONSTRAINT `fk_sprint_sprintState` FOREIGN KEY (`StateID`) REFERENCES `sprintstate` (`SprintStateID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
ADD CONSTRAINT `fk_task_project` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`) ON DELETE NO ACTION ON UPDATE CASCADE,
ADD CONSTRAINT `fk_task_taskState` FOREIGN KEY (`StateID`) REFERENCES `taskstate` (`TaskStateID`) ON DELETE NO ACTION ON UPDATE CASCADE,
ADD CONSTRAINT `fk_task_user` FOREIGN KEY (`Owner`) REFERENCES `user` (`UserID`) ON DELETE NO ACTION ON UPDATE CASCADE,
ADD CONSTRAINT `fk_task_userstory` FOREIGN KEY (`UserStoryID`) REFERENCES `userstory` (`UserStoryID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `taskattachment`
--
ALTER TABLE `taskattachment`
ADD CONSTRAINT `fk_taskAttachment_task` FOREIGN KEY (`TaskID`) REFERENCES `task` (`TaskID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `taskrevision`
--
ALTER TABLE `taskrevision`
ADD CONSTRAINT `fk_taskRevison_task` FOREIGN KEY (`TaskID`) REFERENCES `task` (`TaskID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `taskstate`
--
ALTER TABLE `taskstate`
ADD CONSTRAINT `fk_taskState_taskState` FOREIGN KEY (`Parent`) REFERENCES `taskstate` (`TaskStateID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `taskstatus`
--
ALTER TABLE `taskstatus`
ADD CONSTRAINT `fk_taskStatus_status` FOREIGN KEY (`StatusID`) REFERENCES `status` (`StatusID`) ON DELETE NO ACTION ON UPDATE CASCADE,
ADD CONSTRAINT `fk_taskStatus_task` FOREIGN KEY (`TaskID`) REFERENCES `task` (`TaskID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userassign`
--
ALTER TABLE `userassign`
ADD CONSTRAINT `fk_userAssign_project` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `fk_userAssign_role` FOREIGN KEY (`RoleID`) REFERENCES `role` (`RoleID`) ON DELETE NO ACTION ON UPDATE CASCADE,
ADD CONSTRAINT `fk_userAssign_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userstory`
--
ALTER TABLE `userstory`
ADD CONSTRAINT `fk_userstory_parent` FOREIGN KEY (`ParentID`) REFERENCES `userstory` (`UserStoryID`) ON DELETE NO ACTION ON UPDATE CASCADE,
ADD CONSTRAINT `fk_userstory_project` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`) ON DELETE NO ACTION ON UPDATE CASCADE,
ADD CONSTRAINT `fk_userstory_sprint` FOREIGN KEY (`SprintID`) REFERENCES `sprint` (`SprintID`) ON DELETE NO ACTION ON UPDATE CASCADE,
ADD CONSTRAINT `fk_userstory_user` FOREIGN KEY (`Owner`) REFERENCES `user` (`UserID`) ON DELETE NO ACTION ON UPDATE CASCADE,
ADD CONSTRAINT `fk_userstory_userStoryState` FOREIGN KEY (`StateID`) REFERENCES `userstorystate` (`USStateID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `userstoryattachment`
--
ALTER TABLE `userstoryattachment`
ADD CONSTRAINT `fk_userstoryAttachment_userstory` FOREIGN KEY (`UserStoryID`) REFERENCES `userstory` (`UserStoryID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userstoryrevision`
--
ALTER TABLE `userstoryrevision`
ADD CONSTRAINT `fk_userstoryRevision_userstory` FOREIGN KEY (`UserStoryID`) REFERENCES `userstory` (`UserStoryID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userstorystate`
--
ALTER TABLE `userstorystate`
ADD CONSTRAINT `fk_userstoryState_userstoryState` FOREIGN KEY (`Parent`) REFERENCES `userstorystate` (`USStateID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `userstorystatus`
--
ALTER TABLE `userstorystatus`
ADD CONSTRAINT `fk_userstoryStatus_Status` FOREIGN KEY (`StatusID`) REFERENCES `status` (`StatusID`) ON DELETE NO ACTION ON UPDATE CASCADE,
ADD CONSTRAINT `fk_userstoryStatus_userstory` FOREIGN KEY (`UserStoryID`) REFERENCES `userstory` (`UserStoryID`) ON DELETE CASCADE ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
