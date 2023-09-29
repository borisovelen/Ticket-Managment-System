CREATE DATABASE  IF NOT EXISTS `project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `project`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('3zxylROsupIn3gN6MamcUB__woV77Sh9',1695729456,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T11:57:35.537Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('49KUAAPGxSw6VxwQQhx-S5DvKUAnyahk',1695724606,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T10:36:45.927Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('63Y4erWn-hJ69yPc5wNd1A3iLCGrpUnK',1695729619,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T12:00:18.996Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('8-RYLjiJdjpfSkIFNsS8Ttr4iStcfmXs',1695729616,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T12:00:16.209Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('94Cyo2jxMtErKt7N32yrKw70iGOaLiiz',1695724287,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T10:31:27.191Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('AHCe7vWTN_p9c1N4rqMcg_FA2KCaRk6T',1695729625,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T12:00:25.331Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('A_1QoQmaCy65PF185Zbgj36qZXyCEa1s',1695729609,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T12:00:08.964Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('GVOFouTLPaCSUjXuOsqV59nQGMfSueiE',1695729613,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T12:00:13.480Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('GsiKmjY2AqdxXKP8fujpAtUU8uL4KIsS',1695724387,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T10:33:06.589Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('HDD1LPXNKn9zpgvxtjGTQa5cgibdRGzT',1695724287,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T10:31:27.313Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('IfjppzTla-Jb1ZkCkIiRyuLuLO6hK4kW',1695721868,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T09:51:08.265Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('K_bHzjxxUy_eTK5m8a63LE_EwnS8T3-q',1695729606,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T12:00:05.513Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('OgsMltJRvrF_6cYWoXGsW-jZ26O_OlVD',1695724468,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T10:34:27.587Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('PoDyVGfNM9ipWoU4CjnCcm17NgFUl7Zb',1695730142,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T12:09:02.196Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('PsdlXrNMhBiBc9e9531VJFgILcrEJHOZ',1695724386,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T10:33:06.346Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('TX83fuHH8KupCMPSVOk_IcM9ifkywNG2',1695729622,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T12:00:21.665Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('U8Av_Qckz7l4JUUnhz6VvC_IKjARorHl',1695724621,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T10:37:00.600Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('UEVhxoWf8UghSqfcQYs7K3ASyesDgrfk',1695729437,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T11:57:17.025Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('VyKDyd1KRnnxkraURJrjL0do2b-NSUea',1695729469,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T11:57:48.640Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('WFi375BN_jfvjyAZeOi61Ul1nSmOkicz',1695721843,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T09:50:42.662Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('WosIcgx-rAGG25OHUIR2bKj3-rwwaAUz',1695724606,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T10:36:45.651Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('_LfARJGXwwH-NfAT7Kg9VBSvwssTq-I9',1695729697,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T12:01:36.955Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('cOPcSDZmhrSE4PJ4hvOdKj_q8st88NUi',1695729819,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T12:03:38.756Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('gQdsswFN1agKy_I42ZwAaV7SpASTaYLV',1695729558,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T11:59:17.788Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('l1lVg2cll_jSzMLqcBS-1KE2wS4Ue8ka',1695724621,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T10:37:00.740Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('lo9KVlYwvcC69Ywl7pfir69nLXF8kOe0',1695724626,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T10:37:05.542Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('ndV3K8gVVpeR4g34Kng3vVlZDyRLGSn5',1695729395,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T11:56:35.037Z\",\"httpOnly\":true,\"path\":\"/\"}}'),('zZSHw8ElvKpY7F5sxXsiZqvbd6mtKe-9',1695729819,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-26T12:03:39.208Z\",\"httpOnly\":true,\"path\":\"/\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `short_desc` varchar(50) DEFAULT NULL,
  `description` text,
  `user` int DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `updated_on` datetime DEFAULT NULL,
  `state` enum('New','In progress','Review','Done') DEFAULT 'New',
  `priority` enum('Critical','High','Moderate','Low') DEFAULT 'Low',
  `jira_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jira_id` (`jira_id`),
  UNIQUE KEY `jira_id_2` (`jira_id`),
  UNIQUE KEY `jira_id_3` (`jira_id`),
  KEY `user` (`user`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=932 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (913,'This is issue in Review','916dfgyuhjikl;',NULL,'2023-09-25 10:36:58',10,'2023-09-25 12:03:37','Review','High',10123),(914,'kur ','wert',1,'2023-09-25 11:57:15',1,'2023-09-25 12:01:35','In progress','Critical',10124),(916,'asd','qwert',1,'2023-09-25 14:59:17',NULL,NULL,'New','Moderate',10125),(918,'4ret','wertgry',1,'2023-09-25 15:00:04',NULL,NULL,'New','Low',10126),(920,'w','we',1,'2023-09-25 15:00:08',NULL,NULL,'New','Low',10127),(922,'we','ew',1,'2023-09-25 15:00:13',NULL,NULL,'New','Low',10128),(924,'we','we',1,'2023-09-25 15:00:15',NULL,NULL,'New','Low',10129),(926,'we','we',1,'2023-09-25 15:00:18',NULL,NULL,'New','Low',10130),(928,'we','we',1,'2023-09-25 15:00:21',NULL,NULL,'New','Low',10131),(930,'we','ew',1,'2023-09-25 15:00:25',NULL,NULL,'New','Low',10132);
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(25) NOT NULL,
  `lname` varchar(25) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `role` enum('Admin','Developer','QA','Manager','User') DEFAULT 'User',
  `joined_on` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Elen','Borisov','Elen Borisov','elen.borisov@dss.bg','$2b$10$vBKZknrGN5IUL9zdNgpe6u7KsIAXHcJOIee5MiBVWuOkEfjWMUTie','Admin','2023-09-18 13:41:28'),(2,'Vasil','Bojkov','Vasil Bojkov','cherepa123@7777.bg','$2b$10$vBKZknrGN5IUL9zdNgpe6u7KsIAXHcJOIee5MiBVWuOkEfjWMUTie','QA','2023-09-18 13:41:28'),(3,'Boiko','Borisov','Boiko Borisov','boiko@mutra.bg','$2b$10$vBKZknrGN5IUL9zdNgpe6u7KsIAXHcJOIee5MiBVWuOkEfjWMUTie','Manager','2023-09-18 13:41:28'),(9,'My','Workflow','My Workflow','user@user.user','$2b$10$NGIymbtoqkFX4c7EO5nDwecntMDYH1nAoKCUxyJzhSZWDXc/VXlCm','User','2023-09-21 15:32:18'),(10,'kurkis','asdg','kurkis asdg','kur@abv.bg','$2b$10$e.AJOAfQPPEn30zTUaUBFObj4k8mkoylse3ACFG9gvOL/kIAB3KLC','User','2023-09-25 15:02:53');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'project'
--

--
-- Dumping routines for database 'project'
--
/*!50003 DROP PROCEDURE IF EXISTS `insertIssue` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertIssue`(
	IN inID INT,
    IN inCreatedOn DATETIME,
    IN inUpdatedOn DATETIME,
    IN inState ENUM ('New','In progress','Review','Done'),
    IN inPriority ENUM ('Critical','High','Moderate','Low'),
    IN inShortDesc VARCHAR(50),
    IN inDescription TEXT
)
BEGIN
	DECLARE EXIT HANDLER FOR sqlexception
	BEGIN
		SIGNAL SQLSTATE '12312'
			SET MESSAGE_TEXT = "Issue not added to database";
	END;
    
		INSERT INTO tickets (jira_id,created_on,updated_on,state,priority,short_desc,description) 
        VALUES (inID, inCreatedOn,inUpdatedOn,inState,inPriority,inShortDesc,inDescription);
        
		SELECT CONCAT("Successfully added jira ticket (NO: ",inID,") to the database!") AS msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateIssue` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateIssue`(
	IN inID INT,
    IN inCreatedOn DATETIME,
    IN inUpdatedOn DATETIME,
    IN inState ENUM ('New','In progress','Review','Done'),
    IN inPriority ENUM ('Critical','High','Moderate','Low'),
    IN inShortDesc VARCHAR(50),
    IN inDescription TEXT
)
BEGIN
	DECLARE EXIT HANDLER FOR sqlexception
	BEGIN
		SIGNAL SQLSTATE '12312'
			SET MESSAGE_TEXT = "Issue not updated in database";
	END;
		UPDATE tickets SET created_on=inCreatedOn, updated_on=inUpdatedOn, state=inState, short_desc=inShortDesc, description=inDescription, priority=inPriority WHERE jira_id=inID;
    
		SELECT CONCAT("Successfully updated jira ticket (NO: ",inID,") to the database!") AS msg;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-29 14:52:20
