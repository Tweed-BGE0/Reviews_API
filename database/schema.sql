DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;
\c reviews;

-- ---
-- Table 'reviews'
--
-- ---
DROP TABLE reviews CASCADE;
CREATE TABLE reviews (
id SERIAL,
product_id INT NOT NULL,
rating INT NOT NULL,
date VARCHAR(1000) NOT NULL,
summary VARCHAR(1000) NOT NULL,
body VARCHAR(1000) NOT NULL,
recommend BOOLEAN,
reported BOOLEAN NOT NULL,
reviewer_name VARCHAR(1000),
reviewer_email VARCHAR(1000),
response VARCHAR(1000),
helpfulness INT NOT NULL,
PRIMARY KEY (id)
);

CREATE INDEX idx_reviews_product_id
ON reviews(product_id);

CREATE INDEX idx_reviews_reviews_id
ON reviews(id);

-- COPY reviews(id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
-- FROM '/Users/developer/Desktop/hack_reactor/bootcamp/SDC/data/reviews.csv'
-- DELIMITER ','
-- CSV HEADER;

-- CREATE INDEX idx_reviews_product ON reviews(product_id);
-- DROP INDEX idx_reviews_product;

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE photos (
  id SERIAL,
  review_id INT NOT NULL,
  url VARCHAR(1000) NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX idx_photos_review_id
ON photos(review_id);

-- COPY photos(id, review_id, url)
-- FROM '/Users/developer/Desktop/hack_reactor/bootcamp/SDC/data/reviews_photos.csv'
-- DELIMITER ','
-- CSV HEADER;

-- ---
-- Table 'characteristics'
--
-- ---

DROP TABLE IF EXISTS characteristics CASCADE;
CREATE TABLE characteristics (
  id SERIAL,
  product_id INT NOT NULL,
  name VARCHAR(1000) NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX idx_characteristics_product_id
ON characteristics(product_id);

-- COPY characteristics(id, product_id, name)
-- FROM '/Users/developer/Desktop/hack_reactor/bootcamp/SDC/data/characteristics.csv'
-- DELIMITER ','
-- CSV HEADER;

-- ---
-- Table 'review_characteristic'
--
-- ---

DROP TABLE IF EXISTS review_characteristic CASCADE;
CREATE TABLE review_characteristic (
  id SERIAL,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX idx_review_characteristic_characteristic_id
ON review_characteristic(characteristic_id);

CREATE INDEX idx_review_characteristic_review_id
ON review_characteristic(review_id);

-- COPY review_characteristic(id, characteristic_id, review_id, value)
-- FROM '/Users/developer/Desktop/hack_reactor/bootcamp/SDC/data/characteristic_reviews.csv'
-- DELIMITER ','
-- CSV HEADER;

-- ---
-- Foreign Keys
-- ---

ALTER TABLE photos ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
ALTER TABLE review_characteristic ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
ALTER TABLE review_characteristic ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics (id);
