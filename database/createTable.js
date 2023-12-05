import Database from './connection.js';

function createHitmapTable() {
  const query = `CREATE TABLE IF NOT EXISTS heatmap (
     username PRIMARY KEY,
     web INT,
     android INT,
     ml INT
  )`;
  Database.prepare(query).run();
}

function createUserTable() {
  const query = `CREATE TABLE IF NOT EXISTS UserInfo (
      username TEXT PRIMARY KEY,
      fullname TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      enrollNo TEXT NOT NULL,
      phoneNumber TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT "PARTICIPANT"
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

function createAlreadySubmittedTable() {
  const query = `CREATE TABLE IF NOT EXISTS userAlreadySubmittedTable (
      username TEXT PRIMARY KEY,
      web TEXT default "000000000000000000000",
      android TEXT default "000000000000000000000",
      ml TEXT default "000000000000000000000"
    )`;
  Database.prepare(query).run();
}

function createScoreTable() {
  const query = `CREATE TABLE IF NOT EXISTS scoreTable(
        username TEXT PRIMARY KEY,
        web INT default 0,
        android INT default 0,
        ml INT default 0
    )`;
  Database.prepare(query).run();
}

function createTaskTable(domain) {
  const query = `CREATE TABLE IF NOT EXISTS taskTable${domain}(
    dayNo INT PRIMARY KEY,
    title TEXT default "untitled" ,
    description TEXT default "cooking",
    solution TEXT default "coming soon"
  )`;
  Database.prepare(query).run();
}

function createTables() {
  createHitmapTable();
  createUserTable();
  createReviewSubmissionTable();
  createProcessedSubmissionTable();
  createAlreadySubmittedTable();
  createScoreTable();
  createTaskTable('web');
  createTaskTable('android');
  createTaskTable('ml');
}

export default createTables;
