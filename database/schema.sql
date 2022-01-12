DROP DATABASE IF EXISTS test_6;
CREATE DATABASE test_6;
-- USE test_1;
\c test_6;

DROP TABLE test_table_1 CASCADE;
-- DROP TABLE IF EXISTS test_table_1;
CREATE TABLE test_table_1 (
  id SERIAL,
  name TEXT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO test_table_1 (name) VALUES ('Charizard');


DROP TABLE reviews2 CASCADE;
-- DROP TABLE IF EXISTS reviews2;
CREATE TABLE reviews2 (
id SERIAL,
product_id INT NOT NULL,
rating INT NOT NULL,
summary VARCHAR(1000) NOT NULL,
recommend BOOLEAN,
response VARCHAR(1000),
body VARCHAR(1000) NOT NULL,
date VARCHAR(1000) NOT NULL,
reviewer_name VARCHAR(1000),
helpfulness INT NOT NULL,
PRIMARY KEY (id)
);
-- INSERT INTO `reviews2` (`product_id`,`rating`,`summary`,`recommend`,`body`,`date`,`reviewer_name`,`helpfulness`) VALUES (5, 5,'mysum',true,'okay','testing','again','reviewernamend', 8);
-- ---
-- Table 'photos'
--
-- ---

DROP TABLE photos2 CASCADE;
-- DROP TABLE IF EXISTS photos2;
CREATE TABLE photos2 (
  id SERIAL,
  url VARCHAR(1000) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'review_photo'
--
-- ---

DROP TABLE review_photo2 CASCADE;
-- DROP TABLE IF EXISTS review_photo2;
CREATE TABLE review_photo2 (
  id SERIAL,
  rp_review INT NOT NULL,
  rp_photo INT NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'characteristics'
--
-- ---

DROP TABLE characteristics2 CASCADE;
CREATE TABLE characteristics2 (
  id SERIAL,
  name VARCHAR(1000) NOT NULL,
  value VARCHAR(1000) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'review_characteristic'
--
-- ---

DROP TABLE review_characteristic2 CASCADE;
CREATE TABLE review_characteristic2 (
  id SERIAL,
  rc_review INT NOT NULL,
  rc_characteristic INT NOT NULL,
  PRIMARY KEY (id)
);


-- ---
-- Foreign Keys
-- ---

ALTER TABLE review_photo2 ADD FOREIGN KEY (rp_review) REFERENCES reviews2 (id);
ALTER TABLE review_photo2 ADD FOREIGN KEY (rp_photo) REFERENCES photos2 (id);
ALTER TABLE review_characteristic2 ADD FOREIGN KEY (rc_review) REFERENCES reviews2 (id);
ALTER TABLE review_characteristic2 ADD FOREIGN KEY (rc_characteristic) REFERENCES characteristics2 (id);

-- ---
-- Test Data
-- ---

-- INSERT INTO `reviews2` (`id`,`product_id`,`rating`,`summary`,`recommend`,`body`,`date`,`reviewer_name`,`helpfulness`) VALUES
-- ('','','','','','','','','');
-- INSERT INTO `photos` (`id`,`url`) VALUES
-- ('','');
-- INSERT INTO `review_photo` (`id`,`rp_review`,`rp_photo`) VALUES
-- ('','','');
-- INSERT INTO `characteristics` (`id`,`name`,`value`) VALUES
-- ('','','');
-- INSERT INTO `review_characteristic` (`id`,`rc_review`,`rc_characteristic`) VALUES
-- ('','','');