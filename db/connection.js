import sqlite from "better-sqlite3";

const db = new sqlite("./HitMap.db", { verbose: console.log });

// columns
const columns = [...Array.from({ length: 21 }, (_, i) => `day${i + 1}`)];

function createTable() {
  const query = `CREATE TABLE IF NOT EXISTS HitMap1 (
      username primary key,
      ${columns.map((column) => `${column} BOOLEAN DEFAULT 0`).join(",\n")}
    )`;
  db.prepare(query).run();
}

export default createTable;