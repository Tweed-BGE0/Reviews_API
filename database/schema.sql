DROP DATABASE IF EXISTS test_1;
CREATE DATABASE test_1;
-- USE test_1;

DROP TABLE IF EXISTS test_table_1;
CREATE TABLE test_table_1 (
  id SERIAL,
  name TEXT NOT NULL,
  PRIMARY KEY (id)
);

-- INSERT INTO test_table_1 (name) VALUES ('Charizard');



