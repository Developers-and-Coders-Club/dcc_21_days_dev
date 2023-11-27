import Database from "../connection";

function addParticipant(name) {
  const query = `INSERT INTO HitMap1 (name) VALUES (?)`;
  Database.prepare(query).run(name);
}

function updateParticipation(name, dayNo) {
  if (isNaN(dayNo)) {
    throw new Error("Day number is not a number");
  }
  const query = `UPDATE HitMap1 set day${dayNo} = ? WHERE name = ?`;
  Database.prepare(query).run(1, name);
}

function deleteParticipant(name) {
  const query = `DELETE FROM HitMap1 WHERE name = ?`;
  Database.prepare(query).run(name);
}

function getData() {
  const query = "SELECT * FROM HitMap1";
  return Database.prepare(query).all();
}
const func = {
  addParticipant,
  updateParticipation,
  deleteParticipant,
  getData,
};

export default func;
