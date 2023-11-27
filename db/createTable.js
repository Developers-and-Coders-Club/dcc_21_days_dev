import Database from "./connection.js";

function createHitmapWebTable() {
  const columns = [...Array.from({ length: 21 }, (_, i) => `day${i + 1}`)];
  const query = `CREATE TABLE IF NOT EXISTS HitMapWeb (
      username PRIMARY KEY,
      ${columns.map((column) => `${column} BOOLEAN DEFAULT 0`).join(",\n")}
    )`;
  Database.prepare(query).run();
}

function createHitmapAndroidTable() {
  const columns = [...Array.from({ length: 21 }, (_, i) => `day${i + 1}`)];
  const query = `CREATE TABLE IF NOT EXISTS HitMapAnroid (
      username PRIMARY KEY,
      ${columns.map((column) => `${column} BOOLEAN DEFAULT 0`).join(",\n")}
    )`;
  Database.prepare(query).run();
}

function createHitmapMLTable() {
  const columns = [...Array.from({ length: 21 }, (_, i) => `day${i + 1}`)];
  const query = `CREATE TABLE IF NOT EXISTS HitMapML (
      username PRIMARY KEY,
      ${columns.map((column) => `${column} BOOLEAN DEFAULT 0`).join(",\n")}
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
      phoneNumber BIGINT NOT NULL
    )`;
  Database.prepare(query).run();
}

function createReviewTable() {
  const query = `CREATE TABLE IF NOT EXISTS reviewTable (
      username TEXT NOT NULL,
      submissionId TEXT PRIMARY KEY,
      driveLink TEXT NOT NULL,
      liveLink TEXT,
      domain TEXT NOT NULL,
      dayNo INT NOT NULL
    )`;
  Database.prepare(query).run();
}

function createTables() {
  createHitmapMLTable();
  createHitmapAndroidTable();
  createHitmapWebTable();
  createUserTable();
  createReviewTable();
}

export default createTables;
