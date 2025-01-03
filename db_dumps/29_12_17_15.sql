-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: tw_database
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `article_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `is_approved` tinyint(1) DEFAULT NULL,
  `conference_id` int DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `fk_articles_conferences` (`conference_id`),
  KEY `fk_author_id` (`author_id`),
  CONSTRAINT `fk_articles_conferences` FOREIGN KEY (`conference_id`) REFERENCES `conferences` (`conference_id`),
  CONSTRAINT `fk_author_id` FOREIGN KEY (`author_id`) REFERENCES `conference_authors` (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Articol 1','Salut',0,1,2),(2,'Articol 2','salut',0,2,3),(3,'Articol 3','salutare',0,3,1);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conference_authors`
--

DROP TABLE IF EXISTS `conference_authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conference_authors` (
  `ca_id` int NOT NULL AUTO_INCREMENT,
  `conference_id` int DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  PRIMARY KEY (`ca_id`),
  KEY `fk_ca_conferences` (`conference_id`),
  KEY `fk_ca_authors` (`author_id`),
  CONSTRAINT `fk_ca_authors` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_ca_conferences` FOREIGN KEY (`conference_id`) REFERENCES `conferences` (`conference_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference_authors`
--

LOCK TABLES `conference_authors` WRITE;
/*!40000 ALTER TABLE `conference_authors` DISABLE KEYS */;
INSERT INTO `conference_authors` VALUES (1,1,1),(2,2,3),(3,3,2);
/*!40000 ALTER TABLE `conference_authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conference_reviewers`
--

DROP TABLE IF EXISTS `conference_reviewers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conference_reviewers` (
  `cr_id` int NOT NULL AUTO_INCREMENT,
  `conference_id` int DEFAULT NULL,
  `reviewer_id` int DEFAULT NULL,
  PRIMARY KEY (`cr_id`),
  KEY `fk_cr_conferences` (`conference_id`),
  KEY `fk_cr_reviewers` (`reviewer_id`),
  CONSTRAINT `fk_cr_conferences` FOREIGN KEY (`conference_id`) REFERENCES `conferences` (`conference_id`),
  CONSTRAINT `fk_cr_reviewers` FOREIGN KEY (`reviewer_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference_reviewers`
--

LOCK TABLES `conference_reviewers` WRITE;
/*!40000 ALTER TABLE `conference_reviewers` DISABLE KEYS */;
INSERT INTO `conference_reviewers` VALUES (1,1,2),(2,1,3),(3,2,1),(4,2,3),(5,3,1),(6,3,2);
/*!40000 ALTER TABLE `conference_reviewers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conferences`
--

DROP TABLE IF EXISTS `conferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conferences` (
  `conference_id` int NOT NULL AUTO_INCREMENT,
  `organizer_id` int DEFAULT NULL,
  PRIMARY KEY (`conference_id`),
  KEY `fk_users_conferences` (`organizer_id`),
  CONSTRAINT `fk_users_conferences` FOREIGN KEY (`organizer_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conferences`
--

LOCK TABLES `conferences` WRITE;
/*!40000 ALTER TABLE `conferences` DISABLE KEYS */;
INSERT INTO `conferences` VALUES (1,1),(2,2),(3,3);
/*!40000 ALTER TABLE `conferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `rating` float DEFAULT NULL,
  `feedback` text,
  `reviewer_id` int DEFAULT NULL,
  `article_id` int DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `fk_reviews_reviewer` (`reviewer_id`),
  KEY `fk_reviews_article` (`article_id`),
  CONSTRAINT `fk_reviews_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`article_id`),
  CONSTRAINT `fk_reviews_reviewer` FOREIGN KEY (`reviewer_id`) REFERENCES `conference_reviewers` (`reviewer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,8.2,'Feedback',2,1),(2,10,'Excelent',3,1);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ovidiu-Cristian Oprea','ovidiu-cristian@proiect-tw.com','ovidiu','Organizer'),(2,'Neculai Marius','marius@proiect-tw.com','marius','Organizer'),(3,'Neacsu David','david@proiect-tw.com','david','Organizer');
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

-- Dump completed on 2024-12-29 17:14:58
