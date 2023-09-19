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
INSERT INTO `sessions` VALUES ('G8KSQtT_gs2FovSi2iu8Ho808rgz5yJV',1695128010,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-19T12:53:25.026Z\",\"httpOnly\":true,\"path\":\"/\"},\"userID\":1,\"fullname\":\"Elen Borisov\",\"role\":\"Admin\",\"joined_on\":\"2023-09-18T10:41:28.000Z\",\"email\":\"elen.borisov@dss.bg\",\"logged\":true}'),('IEXPPcerudn3glTrQvdvipEiOgOY7Cy5',1695130361,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-19T13:32:37.684Z\",\"httpOnly\":true,\"path\":\"/\"},\"userID\":1,\"fullname\":\"Elen Borisov\",\"role\":\"Admin\",\"joined_on\":\"2023-09-18T10:41:28.000Z\",\"email\":\"elen.borisov@dss.bg\",\"logged\":true}'),('ZX8N1j86jVyP8sMrmf042ghsXUESobyK',1695114211,'{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2023-09-19T09:03:30.773Z\",\"httpOnly\":true,\"path\":\"/\"}}');
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
  KEY `user` (`user`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=529 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (78,'Test short ASDASD','asdasd',1,'2023-09-14 15:41:13',NULL,NULL,'New','High',NULL),(80,'This is my new description! test','And this is my description.',1,'2023-09-14 15:41:57',1,'2023-09-18 11:05:07','Review','Critical',NULL),(94,'This is my new short description!','as',1,'2023-09-14 15:54:17',1,'2023-09-18 11:03:23','New','Moderate',NULL),(523,'adasdasfasd','',1,'2023-09-18 11:47:21',NULL,NULL,'New','Low',NULL),(528,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','',1,'2023-09-18 11:53:50',NULL,NULL,'New','Low',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Elen','Borisov','Elen Borisov','elen.borisov@dss.bg','$2b$10$vBKZknrGN5IUL9zdNgpe6u7KsIAXHcJOIee5MiBVWuOkEfjWMUTie','Admin','2023-09-18 13:41:28'),(2,'Vasil','Bojkov','Vasil Bojkov','cherepa123@7777.bg','$2b$10$vBKZknrGN5IUL9zdNgpe6u7KsIAXHcJOIee5MiBVWuOkEfjWMUTie','QA','2023-09-18 13:41:28'),(3,'Boiko','Borisov','Boiko Borisov','boiko@mutra.bg','$2b$10$vBKZknrGN5IUL9zdNgpe6u7KsIAXHcJOIee5MiBVWuOkEfjWMUTie','Manager','2023-09-18 13:41:28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-18 17:53:06
