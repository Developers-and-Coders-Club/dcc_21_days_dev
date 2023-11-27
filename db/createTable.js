import Database from "./connection.js";

function createHitmapTable() {
  const columns = [...Array.from({ length: 21 }, (_, i) => `day${i + 1}`)];
  const query = `CREATE TABLE IF NOT EXISTS HitMap1 (
      username primary key,
      ${columns.map((column) => `${column} BOOLEAN DEFAULT 0`).join(",\n")}
    )`;
  Database.prepare(query).run();
}

function createUserTable() {
  return;
}

function createReviewTable() {
  return;
}

function createTables() {
  createHitmapTable();
  createUserTable();
  createReviewTable();
}

export default createTables;
