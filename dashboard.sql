# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.20)
# Database: dashboard
# Generation Time: 2014-11-27 18:07:52 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table news
# ------------------------------------------------------------

DROP TABLE IF EXISTS `news`;

CREATE TABLE `news` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `active` int(11) DEFAULT NULL,
  `date_start` datetime DEFAULT NULL,
  `date_finish` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `correction` int(11) DEFAULT NULL,
  `products` varchar(11) DEFAULT NULL,
  `sub_category` varchar(255) DEFAULT NULL,
  `source_name` varchar(11) DEFAULT NULL,
  `source_url` varchar(11) DEFAULT NULL,
  `mainnews` int(11) DEFAULT NULL,
  `banks` varchar(11) DEFAULT NULL,
  `preview_text` tinytext,
  `text` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;

INSERT INTO `news` (`id`, `title`, `active`, `date_start`, `date_finish`, `status`, `correction`, `products`, `sub_category`, `source_name`, `source_url`, `mainnews`, `banks`, `preview_text`, `text`)
VALUES
	(1,'ÐŸÐµÑ€Ð²Ð°Ñ Ð½Ð¾Ð²Ð¾ÑÑ‚ÑŒ',1,'2014-03-29 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(2,'Ð’Ñ‚Ð¾Ñ€Ð°Ñ Ð½Ð¾Ð²Ð¾ÑÑ‚ÑŒ',NULL,'2014-10-25 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(3,'Ð¢Ñ€ÐµÑ‚ÑŒÑ Ð½Ð¾Ð²Ð¾ÑÑ‚ÑŒ',1,'2014-10-25 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(4,'ÐŸÐµÑ‚ÐµÑ€Ð±ÑƒÑ€Ð¶Ñ†Ð° Ð±ÑƒÐ´ÑƒÑ‚ ÑÑƒÐ´Ð¸Ñ‚ÑŒ Ð·Ð° Ð¿Ð¾Ð´ÑÑ‚Ñ€ÐµÐºÐ°Ñ‚ÐµÐ»ÑŒÑÑ‚Ð²Ð¾ Ðº Ð½Ð°Ð¿Ð°Ð´ÐµÐ½Ð¸ÑŽ Ð½Ð° ÑÐ¾Ñ‚Ñ€ÑƒÐ´Ð½Ð¸ÐºÐ¾Ð² Ð±Ð°Ð½ÐºÐ° Ð² 2005 Ð³Ð¾Ð´Ñƒ',1,'2014-06-28 00:00:00','2014-12-05 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	(5,'ÐšÐ°Ðº Ð·Ð°Ñ€Ð°Ð±Ð¾Ñ‚Ð°Ñ‚ÑŒ Ð¼Ð¸Ð»Ð»Ð¸Ð¾Ð½ ÐºÐ»Ð¸ÐµÐ½Ñ‚Ð¾Ð²',1,'2014-10-31 00:00:00','2014-11-30 00:00:00',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2 Ð¾ÐºÑ‚ÑÐ±Ñ€Ñ Ð›ÐµÑ‚Ð¾ Ð‘Ð°Ð½Ðº Ð¾Ñ„Ð¾Ñ€Ð¼Ð¸Ñ‚ ÐºÑ€ÐµÐ´Ð¸Ñ‚ Ð¼Ð¸Ð»Ð»Ð¸Ð¾Ð½Ð½Ð¾Ð¼Ñƒ ÐºÐ»Ð¸ÐµÐ½Ñ‚Ñƒ. Ð§Ñ‚Ð¾Ð±Ñ‹ Ð´Ð¾ÑÑ‚Ð¸Ñ‡ÑŒ Ð¾Ñ‚Ð¼ÐµÑ‚ÐºÐ¸ Ð² 1 Ð¼Ð»Ð½, ÐºÑ€ÐµÐ´Ð¸Ñ‚Ð½Ð¾Ð¹ Ð¾Ñ€Ð³Ð°Ð½Ð¸Ð·Ð°Ñ†Ð¸Ð¸ Ð¿Ð¾Ñ‚Ñ€ÐµÐ±Ð¾Ð²Ð°Ð»Ð¾ÑÑŒ Ñ‡ÑƒÑ‚ÑŒ Ð±Ð¾Ð»ÐµÐµ Ð´Ð²ÑƒÑ… Ð»ÐµÑ‚. ÐŸÐ¾Ñ€Ñ‚Ð°Ð» Ð‘Ð°Ð½ÐºÐ¸.Ñ€Ñƒ Ð¿Ð¾Ð¿Ñ€Ð¾ÑÐ¸Ð» Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð¸Ñ‚ÐµÐ»ÐµÐ¹ ÐºÑ€ÑƒÐ¿Ð½Ñ‹Ñ… Ð±Ð°Ð½ÐºÐ¾Ð² Ð¿Ð¾Ð´ÐµÐ»Ð¸Ñ‚ÑŒÑÑ ÑÐ²Ð¾Ð¸Ð¼ Ð¾Ð¿Ñ‹Ñ‚Ð¾Ð¼ ÑÐ¾Ð·Ð´Ð°Ð½Ð¸Ñ Ð¼Ð¸Ð»Ð»Ð¸Ð¾Ð½Ð½Ð¾Ð¹ Ð±Ð°Ð·Ñ‹ ÐºÐ»Ð¸ÐµÐ½Ñ‚Ð¾Ð².');

/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `photo` varchar(255) DEFAULT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `photo`, `role`)
VALUES
	(1,'Maxim Denisov','m.denisov@banki.ru','c3284d0f94606de1fd2af172aba15bf3','/assets/img/avatar.jpg','ADMIN'),
	(2,'Eugene Fedoreev','fedoreev@banki.ru','fb469d7ef430b0baf0cab6c436e70375',NULL,'USER'),
	(3,'Sergey Zemskov','zemskov@banki.ru','fb469d7ef430b0baf0cab6c436e70375',NULL,'USER'),
	(4,'Yuri Afanasiev','y.afanasiev@banki.ru','fb469d7ef430b0baf0cab6c436e70375',NULL,'USER'),
	(5,'Pauline Homishina','homishina@banki.ru','fb469d7ef430b0baf0cab6c436e70375',NULL,'USER'),
	(6,'Vladimir Chervonenko','vladimir@banki.ru','fb469d7ef430b0baf0cab6c436e70375',NULL,'USER'),
	(7,'Roman Ivliev','ivliev@banki.ru','fb469d7ef430b0baf0cab6c436e70375',NULL,'USER'),
	(8,'ÐÐ½Ñ‚Ð¾Ð½ ÐšÐ°Ð¼Ð¾Ð»Ð¾Ð²','anton@banki.ru','',NULL,'USER');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
