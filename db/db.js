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

function addParticipant(name) {
  const query = `INSERT INTO HitMap1 (name) VALUES (?)`;
  db.prepare(query).run(name);
}

function updateParticipation(name, dayNo) {
  if (isNaN(dayNo)) {
    throw new Error("Day number is not a number");
  }
  const query = `UPDATE HitMap1 set day${dayNo} = ? WHERE name = ?`;
  db.prepare(query).run(1, name);
}

function deleteParticipant(name) {
  const query = `DELETE FROM HitMap1 WHERE name = ?`;
  db.prepare(query).run(name);
}

function getData() {
  const query = "SELECT * FROM HitMap1";
  return db.prepare(query).all();
}
const func = {
  createTable,
  addParticipant,
  updateParticipation,
  deleteParticipant,
  getData,
};

export default func;
