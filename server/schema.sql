CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms(
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name TEXT CHARACTER SET utf8,
  PRIMARY KEY (id)
);

CREATE TABLE users(
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name TEXT CHARACTER SET utf8,
  PRIMARY KEY (id)
);

CREATE TABLE messages (
  id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  message TEXT CHARACTER SET utf8,
  user_id SMALLINT UNSIGNED NOT NULL REFERENCES user(id),
  createdAt DATETIME,
  room_id SMALLINT UNSIGNED NOT NULL REFERENCES rooms(id),
  PRIMARY KEY (id)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

