-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: 10.111.61.148    Database: intervention
-- ------------------------------------------------------
-- Server version	5.5.54-0+deb8u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `idItem` int(11) AUTO_INCREMENT,
  `commentaire` text,
  `majItem` date DEFAULT NULL,
  `item_Lat` double NOT NULL,
  `item_Lon` double NOT NULL,
  `idUser` int(11) NOT NULL,
  `id_Type` int(11) NOT NULL,
  PRIMARY KEY (`idItem`),
  KEY `FK_ITEM_idUser` (`idUser`),
  KEY `FK_ITEM_id_Type` (`id_Type`),
  CONSTRAINT `FK_ITEM_idUser` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`),
  CONSTRAINT `FK_ITEM_id_Type` FOREIGN KEY (`id_Type`) REFERENCES `type` (`id_Type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo` (
  `idPhoto` int(11) AUTO_INCREMENT,
  `datePhoto` datetime NOT NULL,
  `adressUrlPhoto` varchar(400) NOT NULL,
  `idItem` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  PRIMARY KEY (`idPhoto`),
  KEY `FK_PHOTO_idItem` (`idItem`),
  KEY `FK_PHOTO_idUser` (`idUser`),
  CONSTRAINT `FK_PHOTO_idItem` FOREIGN KEY (`idItem`) REFERENCES `item` (`idItem`),
  CONSTRAINT `FK_PHOTO_idUser` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type` (
  `id_Type` int(11) AUTO_INCREMENT,
  `LabelType` varchar(25) NOT NULL,
  `descriptionType` varchar(40) NOT NULL,
  PRIMARY KEY (`id_Type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `idUser` int(11) AUTO_INCREMENT,
  `nameUser` varchar(40) NOT NULL,
  `loginUser` varchar(40) NOT NULL,
  `firstnameUser` varchar(40) NOT NULL,
  `birthdateUser` date NOT NULL,
  `passwordUser` varchar(40) NOT NULL,
  `emailUser` varchar(40) NOT NULL,
  `phoneUser` char(10) DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-28  9:53:02
