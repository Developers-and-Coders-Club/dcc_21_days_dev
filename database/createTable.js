import Database from "./connection.js";

function createHitmapTable() {
  const query = `CREATE TABLE IF NOT EXISTS heatmap (
     username PRIMARY KEY,
     web INT,
     android INT,
     ml INT"
  )`;
  Database.prepare(query).run();
}

function createUserTable() {
  const query = `CREATE TABLE IF NOT EXISTS UserInfo (
      fullname TEXT NOT NULL,
      username TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      enrollNo TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT "PARTICIPANT",
      phoneNumber TEXT NOT NULL
    )`;
  Database.prepare(query).run();
}

function createReviewSubmissionTable() {
  const query = `CREATE TABLE IF NOT EXISTS reviewSubmissionTable (
      submissionId TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      driveLink TEXT NOT NULL,
      liveLink TEXT,
      domain TEXT NOT NULL,
      dayNo INT NOT NULL
    )`;
  Database.prepare(query).run();
}

function createProcessedSubmissionTable() {
  const query = `CREATE TABLE IF NOT EXISTS processedSubmissionTable (
      submissionId TEXT,
      username TEXT NOT NULL,
      driveLink TEXT NOT NULL,
      liveLink TEXT,
      domain TEXT NOT NULL,
      dayNo INT NOT NULL,
      points TEXT NOT NULL
    )`;
  Database.prepare(query).run();
}

function createTables() {
  createHitmapTable();
  createUserTable();
  createReviewSubmissionTable();
  createProcessedSubmissionTable();
}

export default createTables;
