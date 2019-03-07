# ************************************************************
# Sequel Pro SQL dump
# Version 5438
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.20)
# Database: hhands
# Generation Time: 2019-03-07 13:48:12 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table county
# ------------------------------------------------------------

DROP TABLE IF EXISTS `county`;

CREATE TABLE `county` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_43252ec2f3b60ff73077a18ef7` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `county` WRITE;
/*!40000 ALTER TABLE `county` DISABLE KEYS */;

INSERT INTO `county` (`id`, `name`)
VALUES
	(1,'Alamance'),
	(2,'Alexander'),
	(3,'Alleghany'),
	(4,'Anson'),
	(5,'Ashe'),
	(6,'Avery'),
	(7,'Beaufort'),
	(8,'Bertie'),
	(9,'Bladen'),
	(10,'Brunswick'),
	(11,'Buncombe'),
	(12,'Burke'),
	(13,'Cabarrus'),
	(14,'Caldwell'),
	(15,'Camden'),
	(16,'Carteret'),
	(17,'Caswell'),
	(18,'Catawba'),
	(19,'Chatham'),
	(20,'Cherokee'),
	(21,'Chowan'),
	(22,'Clay'),
	(23,'Cleveland'),
	(24,'Columbus'),
	(25,'Craven'),
	(26,'Cumberland'),
	(27,'Currituck'),
	(28,'Dare'),
	(29,'Davidson'),
	(30,'Davie'),
	(31,'Duplin'),
	(32,'Durham'),
	(33,'Edgecombe'),
	(34,'Forsyth'),
	(35,'Franklin'),
	(36,'Gaston'),
	(37,'Gates'),
	(38,'Graham'),
	(39,'Granville'),
	(40,'Greene'),
	(41,'Guilford'),
	(42,'Halifax'),
	(43,'Harnett'),
	(44,'Haywood'),
	(45,'Henderson'),
	(46,'Hertford'),
	(47,'Hoke'),
	(48,'Hyde'),
	(49,'Iredell'),
	(50,'Jackson'),
	(51,'Johnston'),
	(52,'Jones'),
	(53,'Lee'),
	(54,'Lenoir'),
	(55,'Lincoln'),
	(57,'Macon'),
	(58,'Madison'),
	(59,'Martin'),
	(56,'McDowell'),
	(60,'Mecklenburg'),
	(61,'Mitchell'),
	(62,'Montgomery'),
	(63,'Moore'),
	(64,'Nash'),
	(65,'New Hanover'),
	(66,'Northampton'),
	(67,'Onslow'),
	(68,'Orange'),
	(69,'Pamlico'),
	(70,'Pasquotank'),
	(71,'Pender'),
	(72,'Perquimans'),
	(73,'Person'),
	(74,'Pitt'),
	(75,'Polk'),
	(76,'Randolph'),
	(77,'Richmond'),
	(78,'Robeson'),
	(79,'Rockingham'),
	(80,'Rowan'),
	(81,'Rutherford'),
	(82,'Sampson'),
	(83,'Scotland'),
	(84,'Stanly'),
	(85,'Stokes'),
	(86,'Surry'),
	(87,'Swain'),
	(88,'Transylvania'),
	(89,'Tyrrell'),
	(90,'Union'),
	(91,'Vance'),
	(92,'Wake'),
	(93,'Warren'),
	(94,'Washington'),
	(95,'Watauga'),
	(96,'Wayne'),
	(97,'Wilkes'),
	(98,'Wilson'),
	(99,'Yadkin'),
	(100,'Yancey');

/*!40000 ALTER TABLE `county` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table email_record
# ------------------------------------------------------------

DROP TABLE IF EXISTS `email_record`;

CREATE TABLE `email_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `to` text,
  `cc` text,
  `bcc` text,
  `from` text NOT NULL,
  `replyTo` text,
  `subject` text NOT NULL,
  `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;



# Dump of table organization
# ------------------------------------------------------------

DROP TABLE IF EXISTS `organization`;

CREATE TABLE `organization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `description` text,
  `logoPath` varchar(255) DEFAULT NULL,
  `shortName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c21e615583a3ebbb0977452afb` (`name`),
  UNIQUE KEY `IDX_a5d6fe2306165e568e7aa6ec13` (`shortName`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `organization` WRITE;
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;

INSERT INTO `organization` (`id`, `name`, `url`, `description`, `logoPath`, `shortName`)
VALUES
	(1,'NC Collaborative for Children, Youth and Families','https://nccollaborative.org','<h2>Our Mission</h2>\r\n\r\n<p>The North Carolina State Collaborative for Children, Youth, and Families, through a System of Care framework, provides a forum for collaboration, advocacy and action among families, public and private child and family serving agencies and community partners to improve outcomes for all children, youth and families.</p>\r\n\r\n<h2>What We Do</h2>\r\n\r\n<p>We provide a forum for the discussion of issues regarding how agencies, youth and families can work together to produce better outcomes for children, youth and families a &ldquo;place&rdquo; where decision makers from agencies can come to work collaboratively to better meet the needs of children, youth and families.</p>\r\n\r\n<p>&nbsp;</p>','/static/img/nc_collaborative_modern_logo.jpg','NC Collaborative'),
	(2,'NC Families United','https://www.ncfamiliesunited.org','<p>NC Families United supports and unites the voices of children, youth, and families with mental health concerns to educate, support and advocate for improved services and lives.</p>\r\n\r\n<p>Children/Youth with serious emotional, behavioral and/or mental health challenges and their families will have a family driven, child focused System of Care to ensure their independence, safety, happiness and success in their homes, schools, and their communities.</p>\r\n','/static/img/ncfamlogo.jpg','North Carolina Families United');

/*!40000 ALTER TABLE `organization` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table organization_trainings_training
# ------------------------------------------------------------

DROP TABLE IF EXISTS `organization_trainings_training`;

CREATE TABLE `organization_trainings_training` (
  `organizationId` int(11) NOT NULL,
  `trainingId` int(11) NOT NULL,
  PRIMARY KEY (`organizationId`,`trainingId`),
  KEY `IDX_8b4f64d5c4c61a182f6f89b113` (`organizationId`),
  KEY `IDX_2e30011bdfecc132ca96600e20` (`trainingId`),
  CONSTRAINT `FK_2e30011bdfecc132ca96600e209` FOREIGN KEY (`trainingId`) REFERENCES `training` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_8b4f64d5c4c61a182f6f89b1138` FOREIGN KEY (`organizationId`) REFERENCES `organization` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table system_settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `system_settings`;

CREATE TABLE `system_settings` (
  `id` int(11) NOT NULL,
  `maintenance` tinyint(4) NOT NULL,
  `contactEmail` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `system_settings` WRITE;
/*!40000 ALTER TABLE `system_settings` DISABLE KEYS */;

INSERT INTO `system_settings` (`id`, `maintenance`, `contactEmail`)
VALUES
	(1,0,'no-reply@collab.test');

/*!40000 ALTER TABLE `system_settings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table training
# ------------------------------------------------------------

DROP TABLE IF EXISTS `training`;

CREATE TABLE `training` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `longDescription` text NOT NULL,
  `hours` int(11) DEFAULT NULL,
  `status` enum('draft','active','retired') NOT NULL,
  `authorId` int(11) DEFAULT NULL,
  `allowFeedbackAfterDays` int(11) NOT NULL,
  `isGraded` tinyint(4) NOT NULL,
  `shortDescription` varchar(255) DEFAULT NULL,
  `passPercent` int(11) DEFAULT NULL,
  `coursesTrainingCourse` int(11) DEFAULT NULL,
  `coursesTraining` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c9542f4860e0a0ed44b6e5c295e` (`coursesTrainingCourse`,`coursesTraining`),
  KEY `FK_29fcdcf7d2189699e1d20e1babd` (`authorId`),
  CONSTRAINT `FK_29fcdcf7d2189699e1d20e1babd` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c9542f4860e0a0ed44b6e5c295e` FOREIGN KEY (`coursesTrainingCourse`, `coursesTraining`) REFERENCES `training_course_entry` (`trainingCourseId`, `trainingId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `training` WRITE;
/*!40000 ALTER TABLE `training` DISABLE KEYS */;

INSERT INTO `training` (`id`, `title`, `longDescription`, `hours`, `status`, `authorId`, `allowFeedbackAfterDays`, `isGraded`, `shortDescription`, `passPercent`, `coursesTrainingCourse`, `coursesTraining`)
VALUES
	(1,'Introduction to System of Care and Child and Family Teams','<p><strong>Learning Goals &ndash; most learners will be able to:</strong></p>\r\n\r\n<ol>\r\n	<li>Describe System of Care accurately</li>\r\n	<li>Define System of Care Principles in a practical way</li>\r\n	<li>Describe a Child and Family Team in a practical way</li>\r\n	<li>Describe who may be on a Child and Family Team and why</li>\r\n	<li>Describe the basic roles and responsibilities of Child and Family Team members</li>\r\n</ol>',3,'active',NULL,0,1,NULL,70,NULL,NULL),
	(6,'Introduction to The Collaborative','<p>Learn about <a href=\"https://nccollaborative.org\">The NC Collaborative</a> and its mission. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent <strong>commodo</strong> cursus magna, vel scelerisque nisl consectetur et. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>',1,'active',NULL,0,1,'Learn about The NC Collaborative and its mission.',70,NULL,NULL),
	(11,'Child and Family Teams','<p>Learn about Child and Family Teams (CFTs) and how to work together with families to write an individual Child and Family Plan based on the family&#39;s needs.</p>',2,'active',NULL,0,0,'Learn about Child and Family Teams (CFTs) and how to work together with families to write an individual Child and Family Plan based on the family\'s needs.',NULL,NULL,NULL),
	(12,'Accessing Mental Health Care','<p>Learn about access to mental and behavioral health care services.</p>',2,'active',NULL,0,0,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `training` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table training_attempt
# ------------------------------------------------------------

DROP TABLE IF EXISTS `training_attempt`;

CREATE TABLE `training_attempt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `grade` int(11) DEFAULT NULL,
  `answer` text NOT NULL,
  `userId` int(11) NOT NULL,
  `trainingVersionId` int(11) NOT NULL,
  `status` enum('in-progress','complete') NOT NULL,
  `updatedOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `traineeFeedback` text,
  PRIMARY KEY (`id`),
  KEY `FK_af4ec3e341cdab362d3f48bdb73` (`userId`),
  KEY `FK_e3b77b880173e113f7078ad26eb` (`trainingVersionId`),
  CONSTRAINT `FK_af4ec3e341cdab362d3f48bdb73` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_e3b77b880173e113f7078ad26eb` FOREIGN KEY (`trainingVersionId`) REFERENCES `training_version` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;



# Dump of table training_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `training_category`;

CREATE TABLE `training_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fa3601fe323632518ffd43bebe` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table training_category_trainings_training
# ------------------------------------------------------------

DROP TABLE IF EXISTS `training_category_trainings_training`;

CREATE TABLE `training_category_trainings_training` (
  `trainingCategoryId` int(11) NOT NULL,
  `trainingId` int(11) NOT NULL,
  PRIMARY KEY (`trainingCategoryId`,`trainingId`),
  KEY `IDX_eb44a81d06d354dc6545edbf44` (`trainingCategoryId`),
  KEY `IDX_477a55bd7c8558e59361ad27cc` (`trainingId`),
  CONSTRAINT `FK_477a55bd7c8558e59361ad27cc4` FOREIGN KEY (`trainingId`) REFERENCES `training` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_eb44a81d06d354dc6545edbf446` FOREIGN KEY (`trainingCategoryId`) REFERENCES `training_category` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table training_course
# ------------------------------------------------------------

DROP TABLE IF EXISTS `training_course`;

CREATE TABLE `training_course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table training_course_entry
# ------------------------------------------------------------

DROP TABLE IF EXISTS `training_course_entry`;

CREATE TABLE `training_course_entry` (
  `trainingId` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `trainingCourseId` int(11) NOT NULL,
  PRIMARY KEY (`trainingCourseId`,`trainingId`),
  UNIQUE KEY `IDX_fddc7fb38ad4a0ec2bb303fb09` (`trainingCourseId`,`order`),
  KEY `FK_b28ca37cc67962e643dae23d4fc` (`trainingId`),
  CONSTRAINT `FK_b28ca37cc67962e643dae23d4fc` FOREIGN KEY (`trainingId`) REFERENCES `training` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_c62508834a31cf69b0ba95ca80f` FOREIGN KEY (`trainingCourseId`) REFERENCES `training_course` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table training_version
# ------------------------------------------------------------

DROP TABLE IF EXISTS `training_version`;

CREATE TABLE `training_version` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` json NOT NULL,
  `status` enum('active','inactive','deleted') NOT NULL DEFAULT 'inactive',
  `trainingId` int(11) DEFAULT NULL,
  `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_ee9fd4d5c2bb48d55e929755eb7` (`trainingId`),
  CONSTRAINT `FK_ee9fd4d5c2bb48d55e929755eb7` FOREIGN KEY (`trainingId`) REFERENCES `training` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `training_version` WRITE;
/*!40000 ALTER TABLE `training_version` DISABLE KEYS */;

INSERT INTO `training_version` (`id`, `content`, `status`, `trainingId`, `createdOn`, `updatedOn`)
VALUES
	(5,'{\"pages\": [{\"name\": \"page1\", \"elements\": [{\"html\": \"<h2>Our Mission</h2>\\n\\n<p>The North Carolina State Collaborative for Children, Youth, and Families, through a System of Care framework, provides a forum for collaboration, advocacy and action among families, public and private child and family serving agencies and community partners to improve outcomes for all children, youth and families.</p>\\n\\n<h2>Our Vision</h2>\\n\\n<p>Children, youth and families are healthy, safe and successful at home, in school and in their communities.</p>\\n\\n<h2>What is the State Collaborative for Children, Youth, and Families?</h2>\\n\\n<p>The State Collaborative:&nbsp;</p>\\n\\n<ul>\\n\\t<li>Provides a forum for the discussion of issues regarding how agencies, youth, and families can work together to produce better outcomes for children, youth and families.</li>\\n\\t<li>Develops recommendations regarding the coordination of services, funding, training and local reporting requirements to eliminate duplication and make the system more consumer friendly.</li>\\n\\t<li>Includes representatives of a range of state and local agencies, youth, families, and advocates.</li>\\n\\t<li>Provides support for local Collaboratives and Child and Family Teams.<br />\\n\\t&nbsp;</li>\\n</ul>\\n\", \"name\": \"question2B\", \"type\": \"html\"}]}, {\"name\": \"page2\", \"elements\": [{\"name\": \"question3\", \"type\": \"radiogroup\", \"title\": \"The North Carolina Collaborative for Children, Youth and Families is:\", \"choices\": [\"An equal forum for agency staff, family and youth leaders\", \"A group run by cross system state leaders\", \"A group that wants to maintain the status quo in North Carolina\", \"An organization that believes parents need parenting classes.\"], \"isRequired\": true, \"correctAnswer\": \"An equal forum for agency staff, family and youth leaders\"}, {\"name\": \"question4\", \"type\": \"radiogroup\", \"title\": \"The North Carolina Collaborative for Children, Youth and Families:\", \"choices\": [\"Has nothing to do with local collaborative\", \"Believes in the inclusion of families and youth in every aspect of service delivery and policy\", \"Only includes members who agree\", \"Has to meet two times a month because of policy.\"], \"isRequired\": true}, {\"name\": \"question5\", \"type\": \"radiogroup\", \"title\": \"The training committee of the Collaborative:\", \"choices\": [\"Focuses on the Curriculum “Child and Family Teams from the Family Perspective.” \", \"The Collaborative only has three co-training teams across the state that trains this curriculum.\", \"Provides no technical assistance to training teams\", \"Does not involve youth in training.\"]}]}, {\"name\": \"page3\", \"elements\": [{\"name\": \"question2\", \"type\": \"comment\", \"title\": \"Feedback\"}]}]}','active',1,'2019-01-20 05:38:25.014854','2019-02-08 05:12:32.000000'),
	(10,'{\"pages\": [{\"name\": \"intro\", \"elements\": [{\"html\": \"<h2>Our Mission</h2>\\n\\n<p>The North Carolina State Collaborative for Children, Youth, and Families, through a System of Care framework, provides a forum for collaboration, advocacy and action among families, public and private child and family serving agencies and community partners to improve outcomes for all children, youth and families.</p>\\n\\n<h2>Our Vision</h2>\\n\\n<p>Children, youth and families are healthy, safe and successful at home, in school and in their communities.</p>\\n\\n<h2>What is the State Collaborative for Children, Youth, and Families?</h2>\\n\\n<p>The State Collaborative:&nbsp;</p>\\n\\n<ul>\\n\\t<li>Provides a forum for the discussion of issues regarding how agencies, youth, and families can work together to produce better outcomes for children, youth and families.</li>\\n\\t<li>Develops recommendations regarding the coordination of services, funding, training and local reporting requirements to eliminate duplication and make the system more consumer friendly.</li>\\n\\t<li>Includes representatives of a range of state and local agencies, youth, families, and advocates.</li>\\n\\t<li>Provides support for local Collaboratives and Child and Family Teams.<br />\\n\\t&nbsp;</li>\\n</ul>\\n\", \"name\": \"question2\", \"type\": \"html\"}]}, {\"name\": \"training committee\", \"elements\": [{\"html\": \"<h3>Mission of Training Committee</h3>\\n\\n<p>\\u000bTo design and deliver interagency/family and youth driven practice through training, conferences, Learning Institutes and other forums that promote best practices.</p>\\n\\n<ul>\\n\\t<li>CHILD AND FAMILY TEAMS: FROM THE FAMILY&rsquo;S PERSPECTIVE-This year we have provided a train the trainer for over thirty Provider/ Family/Youth teams that will train this curriculum all over North Carolina.</li>\\n\\t<li>We STRIVE TO develop collaboration among providers, families and youth.</li>\\n</ul>\\n\", \"name\": \"question1\", \"type\": \"html\"}]}, {\"name\": \"cultural competencies\", \"elements\": [{\"html\": \"<h2>Cultural Competencies / Health Disparities</h2>\\n\\n<h3>Mission</h3>\\n\\n<p>Healthy People 2020 defines a health disparity as a:</p>\\n\\n<blockquote>\\n<p>&ldquo;particular type of health difference that is closely linked with social, economic, and/or environmental disadvantage. Health disparities adversely affect groups of people who have systematically experienced greater obstacles to health based on their racial or ethnic group; religion; socioeconomic status; gender; age; mental health; cognitive, sensory, or physical disability; sexual orientation or gender identity; geographic location; or other characteristics historically linked to discrimination or exclusion.&rdquo; Significant behavioral health disparities persist in diverse communities across the United States, including but not limited to: racial and ethnic groups; low SES populations; lesbian, gay, bisexual, transgender, and questioning (LGBTQ) populations; and transition-age youth.</p>\\n</blockquote>\\n\", \"name\": \"question6\", \"type\": \"html\"}]}, {\"name\": \"top accomplishments\", \"elements\": [{\"html\": \"<h2>Top Accomplishments &amp; Advocacy Efforts</h2>\\n\\n<ul>\\n\\t<li>Partnership with state leaders\\n\\t<ul>\\n\\t\\t<li>Designed the local System of Care (SOC) Learning Institutes</li>\\n\\t\\t<li>Supported Raise the Age initiative; and school based mental health initiative with legislators and decision makers</li>\\n\\t\\t<li>Connecting leaders with family and youth voice</li>\\n\\t\\t<li>Work in partnership to increase strategies for family partners</li>\\n\\t</ul>\\n\\t</li>\\n\\t<li>Development and roll out of orientation video and new member packets</li>\\n\\t<li>Governance committee for the SOC Expansion grant</li>\\n\\t<li>Partnered with NC Child, NCFU, SAYSO and Youth M.O.V.E. to present informational forum about new child welfare legislation.</li>\\n\\t<li>Development and follow through on strategic plan</li>\\n\\t<li>Revision, roll out and technical assistance of the Child &amp; Family Team 1 (CFT 1) training\\n\\t<ul>\\n\\t\\t<li>Supporting twenty-eight agency staff and family partner teams across the state</li>\\n\\t</ul>\\n\\t</li>\\n</ul>\\n\", \"name\": \"question7\", \"type\": \"html\"}]}, {\"name\": \"quiz\", \"elements\": [{\"name\": \"question3\", \"type\": \"radiogroup\", \"title\": \"The North Carolina Collaborative for Children, Youth and Families is:\", \"choices\": [\"An equal forum for agency staff, family and youth leaders\", \"A group run by cross system state leaders\", \"A group that wants to maintain the status quo in North Carolina\", \"An organization that believes parents need parenting classes.\"], \"isRequired\": true, \"correctAnswer\": \"An equal forum for agency staff, family and youth leaders\"}, {\"name\": \"question4\", \"type\": \"radiogroup\", \"title\": \"The North Carolina Collaborative for Children, Youth and Families:\", \"choices\": [\"Has nothing to do with local collaborative\", \"Believes in the inclusion of families and youth in every aspect of service delivery and policy\", \"Only includes members who agree\", \"Has to meet two times a month because of policy.\"], \"isRequired\": true, \"correctAnswer\": \"Believes in the inclusion of families and youth in every aspect of service delivery and policy\"}, {\"name\": \"question5\", \"type\": \"radiogroup\", \"title\": \"The training committee of the Collaborative:\", \"choices\": [\"Focuses on the Curriculum “Child and Family Teams from the Family Perspective.” \", \"The Collaborative only has three co-training teams across the state that trains this curriculum.\", \"Provides no technical assistance to training teams\", \"Does not involve youth in training.\"], \"isRequired\": true, \"correctAnswer\": \"Focuses on the Curriculum “Child and Family Teams from the Family Perspective.” \"}, {\"name\": \"question8\", \"type\": \"radiogroup\", \"title\": \"The social marketing committee:\", \"choices\": [\"memberships to people in local communities\", \"Develops bill boards about the collaborative\", \"Develops strategies to assist communities in understanding the goals of the system of care\", \"Only focuses on developing a facebook page\"], \"isRequired\": true, \"correctAnswer\": \"Develops strategies to assist communities in understanding the goals of the system of care\"}]}], \"showProgressBar\": \"both\"}','active',6,'2019-01-25 08:26:32.286015','2019-01-25 08:30:55.000000'),
	(16,'{\"pages\": [{\"name\": \"page1\", \"elements\": [{\"html\": \"<h2>What is a Child and Family Team?</h2>\\n\\n<p>A Child and Family Team (CFT) is a group of people that meets with a child and family to set goals and plan services. The CFT is built around the family to make sure that each family&rsquo;s strengths are promoted and their needs are met. Team members work together with the family to write a Child and Family Plan based on what the child/youth and family wants and needs.</p>\\n\\n<h2>Who is on a Child and Family Team?</h2>\\n\\n<p>The family is always part of the CFT. Children who are old enough to attend meetings, understand the process, and make choices can be on their own CFTs. The team can include anyone who is important in your life and who knows the strengths and needs of your child and family. Team members are usually people who are part of your child&rsquo;s education, care, custody, or treatment, and others who know your family and lend support. They can be:</p>\\n\\n<ul>\\n\\t<li>\\n\\t<p>Family members</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Friends and neighbors</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Community members</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Members of businesses, churches, or other groups</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Teachers and other school staff</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Family advocates</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Service providers (doctors, social workers, case managers, court counselors, teachers, school nurses, etc.)</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Others who know your family well</p>\\n\\t</li>\\n</ul>\\n\\n<h2>What is a family advocate?</h2>\\n\\n<p>Everyone on your Child and Family Team will be helpful and supportive, but the family advocate has a special job to guide and support you as you learn your role as a team member and become active in the System of Care. Your advocate can help you get information, choose service providers, solve problems, and get ready for meetings. Your family advocate can also help you get in touch with other parents to share ideas and experiences. The family advocate usually is a parent of a child with special needs and can provide support and empathy because of having walked in similar shoes like those you find you are wearing.</p>\\n\\n<h2>Should I ask friends to be on my CFT?</h2>\\n\\n<p>A strong team is one that has a mix of family members, friends, community members, and service providers. As you begin getting more of the support and resources that you need through the System of Care, you may need fewer professionals and want more members who are family members and other family supporters in your neighborhood and community. One of the goals of System of Care is to help families become more confident and able to meet the needs of their children without relying only on paid professionals.</p>\\n\\n<h2>How many people are on a CFT?</h2>\\n\\n<p>There is no set number of people on a CFT. Each team is different. Most Child and Family Teams have about 6 to 10 people, but teams can be bigger or smaller depending on what each family wants or needs.</p>\\n\\n<h2>Who chooses team members?</h2>\\n\\n<p>Families choose their team members with help from their Child and Family Team Facilitator or Case Manager. You can also ask your family advocate or others who know your child and family well to help you choose team members. However, if your child is under the legal supervision of the courts, juvenile justice, or social services, representatives from those systems must be part of your CFT.</p>\\n\\n<h2>Does the team ever change?</h2>\\n\\n<p>Teams do change. New members can be added, and sometimes members leave the team when their help is no longer needed.</p>\\n\", \"name\": \"question1\", \"type\": \"html\"}]}, {\"name\": \"page2\", \"elements\": [{\"html\": \"<h2>What does the Child and Family Team do?</h2>\\n\\n<p>The CFT plans services to support the child and family. The CFT checks to make sure services and supports are working, resources are available, and suggests changes if the plan is not working or if different services are needed.</p>\\n\\n<h2>What is the job of the CFT Facilitator?</h2>\\n\\n<p>The Child and Family Team Facilitator has many responsibilities to help organize and manage the CFT and the planning process. Part of the facilitator&rsquo;s job is to set up and lead team meetings. If someone misses a meeting, the CFT Facilitator makes sure that the person provides information for the CFT to consider and knows what happened at the meeting. The CFT Facilitator also makes sure everyone knows about any changes in the Child and Family Plan.</p>\\n\\n<p>Part of the facilitator&rsquo;s job is to gather and share information with all team members who are working with you and your child. The facilitator makes sure that all of the people working with you know about your Child and Family Plan and are doing their jobs to carry out the plan. The facilitator is also responsible, along with your family, to keep track of outcomes or results of the Child and Family Plan. In other words, is the Plan working? If not, the CFT Facilitator helps the family and the rest of the team adjust the Plan. The child and family are not seen as non-compliant but the plan is viewed as needing adjustments.</p>\\n\\n<h2>Who chooses the CFT Facilitator?</h2>\\n\\n<p>The CFT Facilitator is usually a service provider from one of the agencies that is working with you and your child. In most cases, the CFT Facilitator is also your case manager, care coordinator, or social worker. If your child is eligible for mental health services in the System of Care, the case manager will work for a private provider agency. However, you might also receive certain services from the local Department of Social Services, in which case, an individual from Social Services could be your CFT Facilitator. In some cases, an individual from your child&rsquo;s school might be your CFT Facilitator. It depends on what services your child needs and is eligible for and which agency is most involved in meeting your family&rsquo;s needs. Your family advocate and other team members can help you identify the CFT Facilitator.</p>\\n\\n<h2>Who can ask for a CFT meeting?</h2>\\n\\n<p>Any team member can ask for a CFT meeting. Because the family knows the child best and spends the most time with the child, it is very likely that the family will ask for a CFT meeting. If your child has a change in his/her living situation, or another significant life event is occurring for the family, it is always good to have a CFT meeting to make sure you have the services and supports needed to help with the new situation. If there is a crisis, the family or another team member might ask for an emergency meeting. Team members who can&rsquo;t attend an emergency meeting are expected to share their ideas and opinions by phone.</p>\\n\\n<h2>When should I ask for a CFT meeting?</h2>\\n\\n<p>You should ask for a CFT meeting whenever you feel your child&rsquo;s plan needs to be changed, there is a problem to be solved, or a crisis occurs. You also might call a meeting when you want to check progress.</p>\\n\", \"name\": \"question2\", \"type\": \"html\"}]}, {\"name\": \"page3\", \"elements\": [{\"html\": \"<h1>Child and Family Plans</h1>\\n\\n<h2>What is a Child and Family Plan?</h2>\\n\\n<p>A Child and Family Plan is a written plan that lets team members<br />\\nand everyone helping your child know what is needed, what is<br />\\nexpected, and who will do each part. It lists the people and<br />\\nagencies that will work with your child and family. It spells out what people will do and how, where, and when they will help. A Child and Family Plan should always include a detailed Crisis Plan that includes:</p>\\n\\n<ul>\\n\\t<li>\\n\\t<p>A description of warning signs for a crisis for your child</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>What each team member will do to help you and your child avoid a crisis</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>What each team member will do if a crisis does occur</p>\\n\\t</li>\\n</ul>\\n\\n<p>You should expect your Child and Family Plan, including your Crisis Plan, to be very practical and easy to understand. &lsquo;Call 911&rsquo; is not acceptable as the only strategy for a Crisis Plan!!</p>\\n\\n<p>Different agencies may have different specific plans or names for plans for services to children. For example: the NC Division of Mental Health, Developmental Disabilities, and Substance Abuse Services uses Person-Centered-Plans to develop behavioral and related services and supports for those eligible for Enhanced Benefits; public schools develop Individual Education Plans for children eligible for certain services within the school system.</p>\\n\\n<h2>Who writes the Child and Family Plan?</h2>\\n\\n<p>The Child and Family Plan is written by the Child and Family Team. Team members share information and work together to write a special plan (family-driven and child- directed) for your child and family.</p>\\n\", \"name\": \"question3\", \"type\": \"html\"}]}, {\"name\": \"page4\", \"elements\": [{\"html\": \"<h2>Is the Child and Family Plan related to my child&rsquo;s Individual Education Program (IEP)? What about plans and meetings with other agencies?</h2>\\n\\n<p>One of the big advantages of System of Care for children and their families is the emphasis on coordination and integration of services and supports. In a System of Care, a key goal is to establish one unified Child and Family Team and one unified Child and Family Plan: 1 Family/1 Team/1 Plan.</p>\\n\\n<p>The agencies that may provide services for your child and family have certain requirements that they must accomplish. For example, if your child has a learning</p>\\n\\n<p>disability and has an Individual Education Plan, your school system must complete certain activities and forms to be in compliance with the law. However, your Child and Family Plan is the big umbrella plan for your child. This plan should include all of the services from all agencies that support your child. The strengths, goals and needs regarding school that are in your Child and Family Plan should be built into your child&rsquo;s IEP. This would also apply to a 504 Plan. A Child and Family Team is intended to work for the benefit of the child and family. Agencies should be expected to make every effort to meet their particular funding or rule requirements within one unified Child and Family Team so that families do not have to attend several different meetings or have several different plans for their child and family.</p>\\n\", \"name\": \"question4\", \"type\": \"html\"}]}, {\"name\": \"page5\", \"elements\": [{\"html\": \"<h2>How is a Child and Family Plan developed?</h2>\\n\\n<p>A Child and Family Plan is written in steps. The steps help everyone think about your family&rsquo;s strengths, the supports and services you need, and who should help your child and family.</p>\\n\\n<h2>What are the steps to develop a Child and Family Plan?</h2>\\n\\n<p>First know the values and guidelines for a Child and Family Plan (see appendix of this book). Next, begin the process:</p>\\n\\n<p><strong>Step 1</strong></p>\\n\\n<p>Someone asks to hold a Child and Family Team (CFT) meeting. Your family chooses members of the CFT. Your CFT Facilitator and your family advocate can help you decide who should be on the team.</p>\\n\\n<p><strong>Step 2</strong></p>\\n\\n<p>Your CFT Facilitator sets up a meeting at a time and place that works best for your family.</p>\\n\\n<p><strong>Step 3</strong></p>\\n\\n<p>Your CFT meets to write your Child and Family Plan, including a Crisis Plan. All members sign the plan to show that they agree with and will do what it says. All members have a copy of the plan.</p>\\n\\n<p><strong>Step 4</strong></p>\\n\\n<p>Everyone uses the plan. They do what the plan says they will do. They check to see what&rsquo;s working and what&rsquo;s not for each goal.</p>\\n\\n<p><strong>Step 5</strong></p>\\n\\n<p>The team changes the plan if changes are needed.</p>\\n\\n<p><strong>Step 6</strong></p>\\n\\n<p>The team keeps checking to make sure the plan is working</p>\\n\\n<p>&nbsp;</p>\\n\\n<h2>How do I know the plan is working?</h2>\\n\\n<p>It may take a while to see results, but after most services have started, you should begin to see and feel a difference. The differences may be small at first, but in general, everyone should feel organized and more in control. You will know the plan is working when you see progress toward goals and your child is getting better.</p>\\n\\n<h2>What can I do if the plan isn&rsquo;t working?</h2>\\n\\n<p>First of all, be patient. It may take a while for all the services to get started, and then it will take time before you see any changes. If any services are taking too long to get started or are not working, you should tell the CFT Facilitator that you are not satisfied. The CFT Facilitator should then contact the service provider agency to help make changes. Each agency has its own steps to let the right people know that you want to make changes. Talk to your CFT Facilitator or your family advocate to find out the best way to let the right people know your concerns.</p>\\n\", \"name\": \"question5\", \"type\": \"html\"}]}, {\"name\": \"page6\", \"elements\": [{\"html\": \"<h1>Crisis Plans</h1>\\n\\n<h2>What is a Crisis Plan?</h2>\\n\\n<p>Sometimes, in spite of everyone&rsquo;s best efforts, problems arise that need immediate attention. In a System of Care, Child and Family Teams help families try to avoid crises and help if a crisis does occur. A Proactive Crisis Plan is an action plan that tells everyone how to avoid a crisis and a Reactive Crisis Plan is an action plan that tells everyone how to manage an actual crisis situation.</p>\\n\\n<p>The child and his/her family members know best what factors can lead to a crisis and what actions can help defuse it. The best course of action, through careful planning, is to identify cues of an approaching crisis and assign activities that will be carried out to avoid it. This proactive approach is especially important in avoiding unnecessary out of home placements and other restrictive interventions. The Proactive Crisis Plan should identify the triggers that typically set off a crisis, including the child&rsquo;s crisis behavior. This Proactive Crisis Plan indicates who will do what to avoid the development of such crises.</p>\\n\\n<p>At the same time, teams must always be prepared to effectively address an actual crisis situation when all efforts to avoid it have not worked. This is the purpose of a Reactive Crisis Plan &ndash; how team members react when a crisis occurs. The Reactive Crisis Plan spells out details about what will happen if/when a crisis does occur such as who to contact, where the child should go, who will take charge and what backup services will be used to help the child and family. If safety is an issue, a crisis plan always includes strategies for keeping the child and his/her family safe. Without a Crisis Plan, a child often ends up in an institution or residential placement when this could have been avoided. Such plans help everyone respond effectively and make it possible for life to return to normal as quickly as possible. Your Child and Family Team should review the Proactive and Reactive Crisis Plan at each CFT meeting and make changes as your needs or circumstances change, such as changes schools, changes his/her place to live, if a member of the family becomes seriously ill, etc.</p>\\n\\n<h2>Example from a Backup or Crisis Plan</h2>\\n\\n<p>Carl gets into serious trouble when he runs away from home. He steals cars, uses drugs, and hangs out with a gang. If Carl runs away from home:</p>\\n\\n<ul>\\n\\t<li>\\n\\t<p>His grandfather, the person he listens to best when he is upset, will be notified immediately.</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>His grandfather will notify the police and work with them to find him and talk to him.</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>When Carl returns, he will be put on 24-hour watch. Someone will escort him to and from school and be with him all day. He will be at home or with a parent after school.</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>The family will meet with the CFT Facilitator and Carl&rsquo;s therapist to help him learn what to do when he gets the urge to run.</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>The CFT will call an emergency meeting to re-examine the Child and Family Plan and determine why the current plan isn&rsquo;t working and how to change the plan to better meet Carl&rsquo;s needs. For example, how can he be kept busier with pro-social activities? How effective is his drug treatment? Is there a mechanic that can work with Carl to work on cars instead of stealing them?</p>\\n\\t</li>\\n</ul>\\n\\n<h2>Why is a Crisis Plan important?</h2>\\n\\n<p>A crisis plan is important because it helps everyone avoid potential crises and cope in a crisis situation. A Crisis Plan helps everyone react quickly to keep a problem from getting worse; it makes it possible for life to return to normal as quickly as possible.</p>\\n\", \"name\": \"question6\", \"type\": \"html\"}]}]}','active',11,'2019-02-14 06:22:36.486692','2019-02-14 06:40:28.000000'),
	(17,'{\"pages\": [{\"name\": \"page1\", \"elements\": [{\"html\": \"<h2>What happens when someone has mental health problems?</h2>\\n\\n<p>For children and adults alike, mental health problems are real and painful. Mental health problems can change the way any person thinks, feels and acts. Children with mental health problems may have serious school problems, feel bad<br />\\nabout them selves, be very fearful or nervous, or use poor judgment.<br />\\nPoor mental health can lead to other problems like fighting, drug use,<br />\\nloneliness, and suicide.</p>\\n\\n<h2>What causes mental health problems?</h2>\\n\\n<p>There is no easy answer to a question about the causes of mental health problems because there can be many causes. Some of the causes are biological, some are environmental, and some are both. Biological causes are there at birth. They may involve genetics, an imbalance of chemicals in the brain, or damage to the central nervous system. Environmental causes are the events that happen in a person&rsquo;s life such as death of a family member, trauma, abuse, poverty, or even exposure to chemicals.</p>\\n\\n<h2>What can I expect if my child is referred to a mental health center for services?</h2>\\n\\n<p>In the past, North Carolina&rsquo;s mental health programs offered direct services to children and their families. Under the new Mental Health Reform, these mental health programs&rsquo; roles have changed to help manage and develop a variety of services and supports across the community through private providers. Children and their families now have more choices in selecting who will deliver their services and supports, and the range of services and supports is increasing. Local mental health programs are now known as &lsquo;Local Management Entities&rsquo; and the providers are known as the Provider Community. Now, when families seek services and supports in any county in North Carolina, the process should be about the same from one county to another.</p>\\n\\n<p>Each community must now provide a quick-access screening process to help families determine whether their child and/or other family members need mental health services and how to get them. &ldquo;No wrong door&rdquo; is applied to how a person receives services. That means that you should be able to access mental health services through private providers, public providers, hospitals, and family doctors. The Local Management Entity (LME) will be the gatekeeper to public mental health services. Upon arriving at the door, you can expect the first step to be the sharing of information. You will be asked questions about your child and family, including your income. The staff will&nbsp;describe mental health services and answer your questions. They will also give you information about your child&rsquo;s rights under the law.</p>\\n\\n<p>You will be asked to sign some forms to give permission for mental health service providers to treat your child and share information with other agencies. You will also be given information about the cost of services. After this screening is provided, and it is determined that mental health services are needed, the family will have a choice of providers to work with them to plan, deliver and monitor services that build on strengths and meet their particular needs. Families should expect to be fully informed about which providers offer which services and assistance in finding the &lsquo;best fit&rsquo; for their unique strengths and needs.</p>\\n\", \"name\": \"question1\", \"type\": \"html\"}]}, {\"name\": \"page2\", \"elements\": [{\"html\": \"<h2>Who provides mental health services?</h2>\\n\\n<p>As North Carolina continues to develop its Mental Health Reform, services are provided by various private provider agencies. Each Area Program or Local Management Entity works with different providers in their community, creating a Provider Community. As noted above, this allows families to have more choices in who provides their services. Families and consumers can select their care providers and/or change providers to get the best fit in meeting their family&rsquo;s particular strengths and needs. A provider may be identified through: Local Management Entities, brochures, medical doctor/pediatrician, co-workers, family, friends, employee assistance programs, local school district, Department of Social Services, web sites, other child serving agencies, hospitals, advocacy organizations, yellow pages of phone book, NC Council Resource Guide, and consumers of services. Service providers for the LME will go through a process of endorsement in order to have consistent, quality providers available.</p>\\n\\n<p>Do some investigating - check with Division of Facility Services to see if there are any complaints against a provider. You can call them at 919-515-2732 or visit their website at <a href=\\\"http://www.dhhs/facility-services.state.nc.us\\\">www.dhhs/facility-services.state.nc.us</a></p>\\n\", \"name\": \"question2\", \"type\": \"html\"}]}, {\"name\": \"page3\", \"elements\": [{\"html\": \"<h2>When does the System of Care process begin if my child has mental health needs?</h2>\\n\\n<p>After the screening process occurs, an intensive clinical and functional face-to-face evaluation occurs to determine whether the individual meets the &ldquo;Target Population&rdquo; to be eligible to receive mental health services. The face-to-face evaluation is a part of the Diagnostic Assessment. At least two qualified mental health professionals will make the determination of eligibility to receive services. Usually, the professionals are a MD, PhD Psychologist, Physician&rsquo;s Assistant, and/or Nurse Practioner.</p>\\n\\n<p>If your child and family are eligible (meet Target Population status) to receive Enhanced Benefits, you can expect a case manager (or, under new Service<br />\\nDefinitions, a Community Support Team Coordinator) to contact you shortly after your child becomes eligible for services. That individual will most likely work with you as your Child and Family Team Facilitator, beginning the System of Care process for children eligible for Enhanced Benefits under Mental Health Reform. A Child and Family Plan, using a person/family-centered approach, will be developed through your Child and Family Team.</p>\\n\\n<h2>What are the roles of mental health professionals?</h2>\\n\\n<p>Mental health professionals such as social workers, case managers, therapists, counselors, psychologists, and psychiatrists can help identify special mental health challenges and needs, and help to figure out the best treatment to address them. These professionals should participate as active members of each Child and Family Team so that all services and supports are coordinated for your child and family. Listed below are their specialties:</p>\\n\\n<ul>\\n\\t<li>\\n\\t<p>Psychiatrists - Medical doctor that specializes in psychiatry and can write prescriptions.</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Psychologist - Specialist in Psychology that do testing, evaluation, assessments, psychological theory, research methods, psychotherapeutic, techniques. Usually responsible for developing behavior plans</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Social workers - Help individual, families and communities overcome a variety of social and health problems. Most have their master&rsquo;s degree in social work.</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Psychiatric Nurse &ndash; A Registered Nurse (RN) with extra training in mental health. They work with individuals, families or communities to evaluate mental health needs and assist other mental health professionals in treatment and referral.</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Other Mental Health Providers -</p>\\n\\n\\t<ul>\\n\\t\\t<li>\\n\\t\\t<p>Couples and family therapist - May be a psychiatrist, psychologist, social worker or nurse</p>\\n\\t\\t</li>\\n\\t\\t<li>\\n\\t\\t<p>Pastoral counselor - Member of the clergy who integrates religious concepts with training. This professional does not require a license.</p>\\n\\t\\t</li>\\n\\t</ul>\\n\\t</li>\\n</ul>\\n\\n<p>{Adapted from Mental Health Providers: Making the Right Choice: MayoClinic.com}</p>\\n\\n<p>&nbsp;</p>\\n\\n<h2>Who decides about services?</h2>\\n\\n<p>When your Child and Family Team meets, you may identify many services, supports and resources that are needed. It is likely that your team will decide that professional mental health services are needed. Your Child and Family Team can help you with this process. If the all of the services that your child needs are not available, your CFT should put together a Child and Family Plan that includes those services and supports that are available, and your CFT Facilitator should seek assistance from the local Community Collaborative to help figure out how to modify an existing service to meet your child&rsquo;s needs or determine how the community could create the needed service.</p>\\n\", \"name\": \"question3\", \"type\": \"html\"}]}, {\"name\": \"page4\", \"elements\": [{\"html\": \"<h2>What kinds of help can I get from mental health service providers?</h2>\\n\\n<p>Each community may have some differences in the types of mental health services available. In general, mental health provider agencies offer testing, counseling, treatment, planning, education and training, crisis management, care coordination and management of services. The specific nonresidential and residential services that are offered by many mental health providers are described below.</p>\\n\\n<h2>Non-Residential Services</h2>\\n\\n<p>In a System of Care, every effort is made within the community to develop the types and number of non-residential services that children and their families need to remain together, for the child to remain safe at home, in school and in the community. Providers of each of these services should be expected to actively participate in the Child and Family Team process.</p>\\n\\n<ul>\\n\\t<li>\\n\\t<p>Prevention Services &ndash; Programs and education to keep small problems from developing into big ones.</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>In-Home Family Services &ndash; Education, support, counseling and training to help parents learn how to understand their children&rsquo;s problems, how to help their children, and how to cope.</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Care Coordination and Management &ndash; A service that helps families arrange and organize their children&rsquo;s services from many agencies. Care managers are usually the individuals that work with children and their families to organize and run Child and Family Teams. (Currently, Case Managers are responsible for coordinating mental health care in Child and Family Teams. Under North Carolina&rsquo;s Mental Health Reform, a service called Community Support will become available in March 2006. This will combine case management and one-to-one mentoring type services.)</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Day Treatment &ndash; A program for children who can&rsquo;t manage a public school setting, usually because they need very close supervision in a therapeutic setting.</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Outpatient Treatment &ndash; Services such as screening and counseling for children who may have less severe problems and who can get along in their home setting. Outpatient treatment may also be combined with other services when challenges and needs are more serious and complex.</p>\\n\\t</li>\\n</ul>\\n\\n<h2>Residential Services</h2>\\n\\n<p>In a System of Care, out of home or residential services are used as a last resort &ndash; only when nonresidential services are not enough. Residential services are intended to be short-term and used to help reach very clear goals in order to successfully reunite children with their families, schools and community. Providers of each of these services should be expected to actively participate in the Child and Family Team.</p>\\n\\n<ul>\\n\\t<li>Respite &ndash; Children stay in a temporary, safe, stable environment on a planned basis to help give families a break from care giving in order to help keep the child in their home over the long term. There are also emergency respite services that can be available when there is a crisis at home.</li>\\n\\t<li>Therapeutic Foster Care (also called Level II Homes) &ndash; Children live in a home with trained therapeutic parents. There are usually no more than 2 or 3 children in the home. Many Level II providers will work with Child and Family Teams to find a best fit, including having no other children in the home.</li>\\n\\t<li>Group Homes (also called Level III Homes) &ndash; Children live in a home with other children, often with 6 or more other children, who need treatment in a more intensive place. They are closely supervised and receive many services such as counseling and social skills training. They usually attend public school.</li>\\n\\t<li>Inpatient Treatment &ndash; Children are treated in a hospital setting where they receive psychological and medical treatment.</li>\\n</ul>\\n\\n<h2>How do I know what services are the best for my child?</h2>\\n\\n<p>Families should try to become informed about what works and what doesn&rsquo;t work to help children and their families. For example, over the past few years, there has been a growing effort to understand, through research, which services and interventions make a positive difference for children. You may have heard the term &lsquo;Evidence Based Practice&rsquo;, which is the result of this research. Evidence Based Practice (EBP) refers to growing scientific knowledge about treatment practices and their impact on children with emotional or behavioral challenges. North Carolina&rsquo;s Mental Health Reform requires that services provided to children and their families, whenever possible, be supported by evidence of effectiveness. While not every community has fully developed an array of Evidence Based Practices, it is important for families to become informed about this growing body of research. There are a many sources of information about Evidence&nbsp;Based Practices; one of these, written for families, Michigan&rsquo;s 2004 Association for Children&rsquo;s Mental Health manual for parents on Evidence Based Practices9 provides the following description of Evidence Based Practices:</p>\\n\\n<blockquote>\\n<p>&ldquo;Varying criteria exist for a treatment or intervention to be considered evidence based. One common criterion is the efficacy of practice. There are two requirements for any practice to be deemed efficacious (effective). 1) The study must use a treatment manual. 2) The treatment group has, at a minimum, been compared to a non- treatment control group and that the outcomes for those in treatment group were better than the outcomes of those who received no treatment.&rdquo;</p>\\n</blockquote>\\n\\n<p><strong>Cognitive Behavioral Therapy (CBT)</strong><br />\\nCBT has been demonstrated to be one of the most effective treatments for youth with depression. It teaches youth how to change their thoughts and behaviors so they can change the way they feel. The result is a decrease in their depression. It is one of the few psychosocial treatments for depression shown to be effective in random clinical trials. It has been shown to be as effective as antidepressant medications for mild to moderate depressions in some clinical studies.</p>\\n\\n<p><strong>Parent Management Training (PMT)</strong><br />\\nPMT helps parents develop the special skills needed to successfully support and maintain their children at home and in the community. These skills are sometimes described as &lsquo;advanced child behavior management skills.&rsquo; The techniques taught are based on social learning principles that assist families in understanding how positive and negative behaviors are developed and maintained by their consequences.</p>\\n\\n<p><strong>Multi-Systemic Therapy (MST)</strong><br />\\nMST is a program designed to target youth between the ages of 12 to 17 who have long- term (chronic) violent or substance-abusing behaviors and have become juvenile offenders. Treatment should emphasize the positive and utilize strengths as opportunities for change. This program promotes responsible behavior to decrease irresponsible behaviors, targets well-defined problems, and changes the sequence of behaviors that contribute to identified problems. Frequency and duration of sessions are determined by family need and are usually provided in the family home. Therapists usually have 60 hours of contact with the family over approximately four months.</p>\\n\\n<p><strong>Multi-Dimensional Treatment Foster Care (MTFC)</strong><br />\\nMTFC was developed from the foundation of Parent Management Training (PMT). The important components are:</p>\\n\\n<ul>\\n\\t<li>Increased supervision</li>\\n\\t<li>Positive adult-youth relationship</li>\\n\\t<li>Reduced contact with deviant peers o Family management skills</li>\\n</ul>\\n\\n<p>This program attempts to decrease covert and overt anti-social behavior, increase appropriate behavior, and build pro-social skills. It utilizes parents, teachers, and other adults as change agents for the child. Individual and family therapists, as well as a program supervisor, contribute to the child&rsquo;s treatment. Youth must progress through a three-level system of supervision, rules, privileges and rewards.&ldquo;</p>\\n\\n<p>Another key service that is supported by research for effectiveness is <strong>Intensive Case Management</strong>. Intensive Case Management was developed to work intensively with a child&rsquo;s family and coordinate with teachers and other helping professionals to develop an individualized comprehensive service plan. The case managers are specially trained to assess and coordinate the supports and services necessary to help children and adolescents live successfully at home and in the community. There is a 24-hours a day, 7-days per week response capacity. The number of children and families the case manager works with is small, no more than 15 at a time, and less if more intensive services are necessary. Case management or similar mechanisms (to be called &lsquo;Community Support Services for Children and Adolescents in North Carolina&rsquo;s new Service Definitions) are essential to ensure that multiple services are delivered in a coordinated and therapeutic manner and that so children and their families can move through the system of services in accordance with their changing strengths and needs.</p>\\n\\n<p>In North Carolina, case managers have long played the role of family helpers and advocates, by helping families obtain and coordinate services for their children. Many child serving agencies have staff that provide case management services, including mental health providers, local Departments of Social Services, local School Systems, etc. In a System of Care, a case manager often takes on the role of the Child and Family Team Facilitator, but there is also a growing movement for parents to take on the facilitation role as well as to have independent facilitators. In any case, as communities in North Carolina progress in developing strong and effective local Systems of Care, the Child and Family Team Facilitator role is a key role to better promote the strengths and meet the needs of children with behavioral, education and safety challenges, and their families.</p>\\n\\n<p>An area of growing concern and interest about how children get along at home, school, and in the community is the impact of trauma. Trauma (from deaths in the&nbsp;family, from abuse or neglect, from exposure to violence, etc.) can have a profound impact on how children function in their everyday lives. Trauma can be at the root of many problems including depression and acting out behaviors, but is often overlooked in assessment, diagnosis and treatment. There are special interventions and approaches that are most effective for assessing and treating trauma issues.</p>\\n\", \"name\": \"question4\", \"type\": \"html\"}]}, {\"name\": \"page5\", \"elements\": [{\"html\": \"<h2>How do I know if the right services are being provided?</h2>\\n\\n<p>Families are the experts on their child. Families know best what their child and family needs. Families should feel comfortable and be encouraged to ask questions about services and interventions. Some approaches to consider include11:</p>\\n\\n<ul>\\n\\t<li>\\n\\t<p>Ask for all available information about a suggested service or intervention for your child and family.</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Evaluate how services so far have worked with your child and family. Have they helped?</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Discuss using a service or intervention with your Child and Family Team, with other families, with a trusted provider who knows your child and family. Family involvement is critical to the success of services and interventions for children. Decisions about your child&rsquo;s treatment and support services should be made after thorough discussion whenever possible.</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Use a service or intervention on a trial basis. At the end of the trial period, the child&rsquo;s progress will determine the service or intervention&rsquo;s effectiveness and next steps. However, be sure you understand the length of time it usually takes for the service or intervention to &lsquo;take effect&rsquo;.</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Some specific questions to consider asking and discussing with your Child and Family Team and&nbsp;professionals providing services to your child:</p>\\n\\n\\t<ul>\\n\\t\\t<li>Is this an Evidence-Based Practice? If so, is there a description of the practice and how it works?</li>\\n\\t\\t<li>Is there an evidence-based treatment available for my child&rsquo;s diagnosis? If you are not recommending an evidence-based treatment, please explain why.</li>\\n\\t\\t<li>What changes should we expect to see?</li>\\n\\t\\t<li>How long before you think we will see these changes?</li>\\n\\t\\t<li>What is my role in treatment?</li>\\n\\t</ul>\\n\\t</li>\\n</ul>\\n\", \"name\": \"question5\", \"type\": \"html\"}]}, {\"name\": \"page6\", \"elements\": [{\"html\": \"<h1>How can I find out more about services in my community?</h1>\\n\\n<p>There are many services available in North Carolina&rsquo;s System of Care. Some services are formal services you get through agencies like mental health clinics or in-home counselors. Other agencies, such as local Departments of Social Services, Public Health, the Department of Public Instruction, the Administrative Office of the Courts, and Juvenile Justice provide services that some children and their families need. Some services are informal supports you get in your community from clubs, churches, recreation centers, friends, and family members. In a System of Care, all of these services and resources become integrated for a child and his/her family through on unified Child and Family Team. To learn more about resources for your child in your community, you can:</p>\\n\\n<ul>\\n\\t<li>\\n\\t<p>Ask your family advocate or Child and Family Team Facilitator</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Get involved in your local Community Collaborative</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Get referrals from professionals</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Call your local parent support network</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Call your local mental health center/Local Management Entity</p>\\n\\t</li>\\n\\t<li>\\n\\t<p>Tell people what you want and what you think your child needs</p>\\n\\t</li>\\n</ul>\\n\", \"name\": \"question6\", \"type\": \"html\"}]}]}','active',12,'2019-02-14 10:40:52.748376','2019-02-14 11:23:58.000000');

/*!40000 ALTER TABLE `training_version` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phash` varchar(255) NOT NULL,
  `createdOn` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `countyId` int(11) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `status` enum('active','deleted','unverified','suspended') NOT NULL DEFAULT 'unverified',
  `verifyCode` varchar(255) DEFAULT NULL,
  `lastLoggedIn` timestamp NULL DEFAULT NULL,
  `passwordResetToken` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  KEY `FK_4fa7e717948c05114afb6ac4a58` (`countyId`),
  CONSTRAINT `FK_4fa7e717948c05114afb6ac4a58` FOREIGN KEY (`countyId`) REFERENCES `county` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `phash`, `createdOn`, `countyId`, `gender`, `status`, `verifyCode`, `lastLoggedIn`, `passwordResetToken`)
VALUES
	(1,'Alice','Tester','alicetester@example.com','$2b$10$UmpalhfdBxws/xOnCUtjl.l9PMcZQhCYhU47fy1vuRfye.SH7ix8O','0000-00-00 00:00:00.000000',92,'female','active','JwU3o5HyTm1WQFzJ7Y5wsYCjQqdScpWu','2019-03-07 07:48:41',NULL),
	(2,'Bob','Tester','bobtester@example.com','$2b$12$Zaigb/EeASMwBcaX3yDWeeWHs07zeMbPu2oJwov9lS1EB8HrMtz3.','0000-00-00 00:00:00.000000',92,'male','active',NULL,'2019-02-12 01:47:26',NULL);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_31f96f2013b7ac833d7682bf02` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;

INSERT INTO `user_role` (`id`, `name`)
VALUES
	(1,'admin'),
	(4,'author'),
	(2,'learner'),
	(5,'manager'),
	(6,'superuser'),
	(3,'trainer');

/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_user_roles_user_role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_user_roles_user_role`;

CREATE TABLE `user_user_roles_user_role` (
  `userId` int(11) NOT NULL,
  `userRoleId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`userRoleId`),
  KEY `IDX_7283710ea40464575a32cbbc2b` (`userId`),
  KEY `IDX_dee686d373e92c6414114a1a51` (`userRoleId`),
  CONSTRAINT `FK_7283710ea40464575a32cbbc2b8` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_dee686d373e92c6414114a1a511` FOREIGN KEY (`userRoleId`) REFERENCES `user_role` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user_user_roles_user_role` WRITE;
/*!40000 ALTER TABLE `user_user_roles_user_role` DISABLE KEYS */;

INSERT INTO `user_user_roles_user_role` (`userId`, `userRoleId`)
VALUES
	(1,1),
	(2,2);

/*!40000 ALTER TABLE `user_user_roles_user_role` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
