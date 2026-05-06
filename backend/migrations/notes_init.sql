CREATE DATABASE IF NOT EXISTS notesdb;
USE notesdb;
CREATE TABLE IF NOT EXISTS notes (
  id VARCHAR(36) PRIMARY KEY,
  title TEXT,
  content TEXT,
  created_at DATETIME,
  updated_at DATETIME
);
