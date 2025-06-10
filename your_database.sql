/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : your_database

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 08/06/2025 20:44:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bing
-- ----------------------------
DROP TABLE IF EXISTS `bing`;
CREATE TABLE `bing`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q1` int NULL DEFAULT NULL,
  `q2` int NULL DEFAULT NULL,
  `q3` int NULL DEFAULT NULL,
  `q4` int NULL DEFAULT NULL,
  `q5` int NULL DEFAULT NULL,
  `q6` int NULL DEFAULT NULL,
  `q7` int NULL DEFAULT NULL,
  `q8` int NULL DEFAULT NULL,
  `q9` int NULL DEFAULT NULL,
  `q10` int NULL DEFAULT NULL,
  `q11` int NULL DEFAULT NULL,
  `q12` int NULL DEFAULT NULL,
  `q13` int NULL DEFAULT NULL,
  `q14` int NULL DEFAULT NULL,
  `q15` int NULL DEFAULT NULL,
  `q16` int NULL DEFAULT NULL,
  `q17` int NULL DEFAULT NULL,
  `q18` int NULL DEFAULT NULL,
  `q19` int NULL DEFAULT NULL,
  `q20` int NULL DEFAULT NULL,
  `q21` int NULL DEFAULT NULL,
  `q22` int NULL DEFAULT NULL,
  `q23` int NULL DEFAULT NULL,
  `q24` int NULL DEFAULT NULL,
  `q25` int NULL DEFAULT NULL,
  `q26` int NULL DEFAULT NULL,
  `q27` int NULL DEFAULT NULL,
  `q28` int NULL DEFAULT NULL,
  `q29` int NULL DEFAULT NULL,
  `q30` int NULL DEFAULT NULL,
  `q31` int NULL DEFAULT NULL,
  `q32` int NULL DEFAULT NULL,
  `q33` int NULL DEFAULT NULL,
  `q34` int NULL DEFAULT NULL,
  `q35` int NULL DEFAULT NULL,
  `q36` int NULL DEFAULT NULL,
  `q37` int NULL DEFAULT NULL,
  `q38` int NULL DEFAULT NULL,
  `q39` int NULL DEFAULT NULL,
  `q40` int NULL DEFAULT NULL,
  `q41` int NULL DEFAULT NULL,
  `q42` int NULL DEFAULT NULL,
  `q43` int NULL DEFAULT NULL,
  `q44` int NULL DEFAULT NULL,
  `q45` int NULL DEFAULT NULL,
  `q46` int NULL DEFAULT NULL,
  `q47` int NULL DEFAULT NULL,
  `q48` int NULL DEFAULT NULL,
  `q49` int NULL DEFAULT NULL,
  `q50` int NULL DEFAULT NULL,
  `q51` int NULL DEFAULT NULL,
  `q52` int NULL DEFAULT NULL,
  `q53` int NULL DEFAULT NULL,
  `q54` int NULL DEFAULT NULL,
  `q55` int NULL DEFAULT NULL,
  `q56` int NULL DEFAULT NULL,
  `q57` int NULL DEFAULT NULL,
  `q58` int NULL DEFAULT NULL,
  `q59` int NULL DEFAULT NULL,
  `q60` int NULL DEFAULT NULL,
  `q61` int NULL DEFAULT NULL,
  `q62` int NULL DEFAULT NULL,
  `q63` int NULL DEFAULT NULL,
  `q64` int NULL DEFAULT NULL,
  `q65` int NULL DEFAULT NULL,
  `q66` int NULL DEFAULT NULL,
  `q67` int NULL DEFAULT NULL,
  `q68` int NULL DEFAULT NULL,
  `q69` int NULL DEFAULT NULL,
  `q70` int NULL DEFAULT NULL,
  `q71` int NULL DEFAULT NULL,
  `q72` int NULL DEFAULT NULL,
  `q73` int NULL DEFAULT NULL,
  `q74` int NULL DEFAULT NULL,
  `q75` int NULL DEFAULT NULL,
  `q76` int NULL DEFAULT NULL,
  `q77` int NULL DEFAULT NULL,
  `q78` int NULL DEFAULT NULL,
  `q79` int NULL DEFAULT NULL,
  `q80` int NULL DEFAULT NULL,
  `q81` int NULL DEFAULT NULL,
  `q82` int NULL DEFAULT NULL,
  `q83` int NULL DEFAULT NULL,
  `q84` int NULL DEFAULT NULL,
  `q85` int NULL DEFAULT NULL,
  `q86` int NULL DEFAULT NULL,
  `q87` int NULL DEFAULT NULL,
  `q88` int NULL DEFAULT NULL,
  `q89` int NULL DEFAULT NULL,
  `q90` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bing
-- ----------------------------

-- ----------------------------
-- Table structure for scl90
-- ----------------------------
DROP TABLE IF EXISTS `scl90`;
CREATE TABLE `scl90`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q1` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q2` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q3` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q4` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q5` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q6` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q7` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q8` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q9` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q10` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q11` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q12` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q13` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q14` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q15` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q16` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q17` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q18` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q19` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q20` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q21` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q22` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q23` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q24` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q25` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q26` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q27` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q28` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q29` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q30` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q31` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q32` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q33` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q34` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q35` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q36` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q37` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q38` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q39` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q40` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q41` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q42` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q43` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q44` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q45` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q46` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q47` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q48` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q49` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q50` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q51` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q52` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q53` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q54` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q55` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q56` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q57` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q58` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q59` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q60` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q61` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q62` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q63` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q64` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q65` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q66` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q67` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q68` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q69` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q70` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q71` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q72` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q73` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q74` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q75` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q76` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q77` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q78` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q79` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q80` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q81` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q82` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q83` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q84` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q85` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q86` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q87` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q88` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q89` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `q90` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of scl90
-- ----------------------------
INSERT INTO `scl90` VALUES (1, 'root', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '2025-06-08 18:00:18');
INSERT INTO `scl90` VALUES (2, 'user1', '1', '1', '1', '1', '1', '2', '2', '2', '2', '2', '3', '3', '3', '3', '3', '1', '1', '1', '1', '1', '2', '2', '2', '2', '2', '1', '1', '1', '1', '1', '3', '3', '3', '3', '3', '5', '5', '5', '5', '5', '4', '4', '4', '4', '4', '3', '3', '3', '3', '3', '1', '1', '1', '1', '1', '3', '3', '3', '3', '3', '1', '1', '1', '1', '1', '2', '2', '2', '2', '2', '1', '1', '1', '1', '1', '5', '5', '5', '5', '5', '3', '3', '3', '3', '3', '2', '2', '2', '2', '2', '2025-06-08 18:08:15');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (14, 'root', NULL, '$2b$10$1qUQKx9HE.S1g.O1e3WapOS8ZP4zuPsLmVOZlSaDvbzsLtGSETf5q');
INSERT INTO `users` VALUES (15, 'user1', NULL, '$2b$10$VZoNS5/tfYGC/ZbzL7D.LOYR1sbaqdfHsVmnxaHoj6ymdbM3qcq2i');

SET FOREIGN_KEY_CHECKS = 1;
