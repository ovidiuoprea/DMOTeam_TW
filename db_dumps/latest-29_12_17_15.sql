-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: tw_database
-- ------------------------------------------------------
-- Server version	8.0.40

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
  `conference_id` int DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `fk_articles_conferences` (`conference_id`),
  KEY `fk_author_id` (`author_id`),
  CONSTRAINT `fk_articles_conferences` FOREIGN KEY (`conference_id`) REFERENCES `conferences` (`conference_id`),
  CONSTRAINT `fk_author_id` FOREIGN KEY (`author_id`) REFERENCES `conference_authors` (`author_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Articol1','Content1',1,2),(2,'Articol2','Content2',1,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference_authors`
--

LOCK TABLES `conference_authors` WRITE;
/*!40000 ALTER TABLE `conference_authors` DISABLE KEYS */;
INSERT INTO `conference_authors` VALUES (55,1,2),(56,2,2),(57,3,2),(58,4,2),(59,5,2),(60,6,2),(61,7,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference_reviewers`
--

LOCK TABLES `conference_reviewers` WRITE;
/*!40000 ALTER TABLE `conference_reviewers` DISABLE KEYS */;
INSERT INTO `conference_reviewers` VALUES (1,1,2),(2,1,3),(3,2,1),(4,2,3),(5,3,1),(6,3,2),(7,18,5),(8,18,6),(9,19,5),(10,19,6),(11,20,5),(12,20,6),(13,21,5),(14,21,6),(15,22,7),(16,22,5),(17,22,6),(18,23,5),(19,23,7),(20,23,6),(21,24,5),(22,24,6);
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
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`conference_id`),
  KEY `fk_users_conferences` (`organizer_id`),
  CONSTRAINT `fk_users_conferences` FOREIGN KEY (`organizer_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conferences`
--

LOCK TABLES `conferences` WRITE;
/*!40000 ALTER TABLE `conferences` DISABLE KEYS */;
INSERT INTO `conferences` VALUES (1,1,'Nume conferinta','Descriere conferinta'),(2,2,'Nume conferinta','Descriere conferinta'),(3,3,'Nume conferinta','Descriere conferinta'),(4,3,'Nume conferinta','Descriere conferinta'),(5,3,'Nume conferinta','Descriere conferinta'),(6,2,'Nume conferinta','Descriere conferinta'),(7,2,'Nume conferinta','Descriere conferinta'),(8,2,'Nume conferinta','Descriere conferinta'),(9,2,'Nume conferinta','Descriere conferinta'),(10,2,'Nume conferinta','Descriere conferinta'),(11,2,'Nume conferinta','Descriere conferinta'),(12,2,'Nume conferinta','Descriere conferinta'),(13,2,'Nume conferinta','Descriere conferinta'),(14,2,'Nume conferinta','Descriere conferinta'),(15,2,'Nume conferinta','Descriere conferinta'),(16,2,'Nume conferinta','Descriere conferinta'),(17,2,'Nume conferinta','Descriere conferinta'),(18,2,'Nume conferinta','Descriere conferinta'),(19,2,'Nume conferinta','Descriere conferinta'),(20,2,'Nume conferinta','Descriere conferinta'),(21,2,'Nume conferinta','Descriere conferinta'),(22,2,'Nume conferinta','Descriere conferinta'),(23,2,'Nume conferinta','Descriere conferinta'),(24,2,'Nume conferinta','Descriere conferinta');
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
  `is_approved` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`review_id`),
  KEY `fk_reviews_reviewer` (`reviewer_id`),
  KEY `fk_reviews_article` (`article_id`),
  CONSTRAINT `fk_reviews_article` FOREIGN KEY (`article_id`) REFERENCES `articles` (`article_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_reviews_reviewer` FOREIGN KEY (`reviewer_id`) REFERENCES `conference_reviewers` (`reviewer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (9,2,'nu',2,1,0),(10,5,'Imi place mult',1,1,1);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_table`
--

DROP TABLE IF EXISTS `test_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_table` (
  `id` bigint NOT NULL,
  `nume` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_table`
--

LOCK TABLES `test_table` WRITE;
/*!40000 ALTER TABLE `test_table` DISABLE KEYS */;
INSERT INTO `test_table` VALUES (1,'salut'),(2,'Salutare');
/*!40000 ALTER TABLE `test_table` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ovidiu-Cristian Oprea','ovidiu-cristian@proiect-tw.com','ovidiu','Organizer'),(2,'Neculai Marius','marius@proiect-tw.com','marius','Organizer'),(3,'Neacsu David','david@proiect-tw.com','david','Organizer'),(5,'Reviewer','review@email.com','1234','Reviewer'),(6,'Reviewer2','review2@email.com','1234','Reviewer'),(7,'Reviewer3','review3@email.com','1234','Reviewer'),(8,'Reviewer4','review4@email.com','1234','Reviewer'),(9,'Reviewer5','review5@email.com','1234','Reviewer');
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

-- Dump completed on 2025-01-03 15:02:22
