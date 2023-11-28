import Database from "./connection.js";

function createHitmapTable() {
  const query = `CREATE TABLE IF NOT EXISTS HitMap1 (
     username PRIMARY KEY,
     web TEXT default "000000000000000000000",
     android TEXT default "000000000000000000000",
     ml TEXT default "000000000000000000000"
  )`;
  Database.prepare(query).run();
}

function createUserTable() {
  const query = `CREATE TABLE IF NOT EXISTS UserInfo (
      username TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      enrollNo TEXT NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT "PARTICIPANT",
      phoneNumber TEXT NOT NULL
    )`;
  Database.prepare(query).run();
}

function createReviewTable() {
  const query = `CREATE TABLE IF NOT EXISTS reviewTable (
      submissionId TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      driveLink TEXT NOT NULL,
      liveLink TEXT,
      domain TEXT NOT NULL,
      dayNo INT NOT NULL
    )`;
  Database.prepare(query).run();
}

function createTables() {
  createHitmapTable();
  createUserTable();
  createReviewTable();
}

export default createTables;
