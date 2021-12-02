DROP DATABASE IF EXISTS express_db;
CREATE DATABASE express_db;

USE express_db;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT primary key,
  name varchar(30),
  age int
);

INSERT INTO users (id, name, age) VALUES (1, 'User1', 11);
INSERT INTO users (id, name, age) VALUES (2, 'User2', 12);
INSERT INTO users (id, name, age) VALUES (3, 'User3', 13);
INSERT INTO users (id, name, age) VALUES (4, 'User4', 14);
INSERT INTO users (id, name, age) VALUES (5, 'User5', 15);
INSERT INTO users (id, name, age) VALUES (6, 'User6', 16);
INSERT INTO users (id, name, age) VALUES (7, 'User7', 17);
INSERT INTO users (id, name, age) VALUES (8, 'User8', 18);
INSERT INTO users (id, name, age) VALUES (9, 'User9', 19);
INSERT INTO users (id, name, age) VALUES (10, 'User10', 20);

-- DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  id int NOT NULL AUTO_INCREMENT primary key,
  user_id int NOT NUll,
  content varchar(50)
);

INSERT INTO posts (id, user_id, content) VALUES (1, 1, 'test1');
INSERT INTO posts (id, user_id, content) VALUES (2, 2, 'test2');
INSERT INTO posts (id, user_id, content) VALUES (3, 3, 'test3');
INSERT INTO posts (id, user_id, content) VALUES (4, 4, 'test4');
INSERT INTO posts (id, user_id, content) VALUES (5, 5, 'test5');
INSERT INTO posts (id, user_id, content) VALUES (6, 6, 'test6');
INSERT INTO posts (id, user_id, content) VALUES (7, 7, 'test7');
INSERT INTO posts (id, user_id, content) VALUES (8, 8, 'test8');
INSERT INTO posts (id, user_id, content) VALUES (9, 9, 'test9');
INSERT INTO posts (id, user_id, content) VALUES (10, 10, 'test10');