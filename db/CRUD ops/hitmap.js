import Database from "../connection";

async function addParticipant(username) {
  const query = `INSERT INTO HitMap1 (username) VALUES (?)`;
  await Database.prepare(query).run(username);
}

async function updateParticipation(name, dayNo) {
  if (isNaN(dayNo)) {
    throw new Error("Day number is not a number");
  }
  const query = `UPDATE HitMap1 set day${dayNo} = ? WHERE name = ?`;
  await Database.prepare(query).run(1, name);
}

async function deleteParticipant(name) {
  const query = `DELETE FROM HitMap1 WHERE name = ?`;
  await Database.prepare(query).run(name);
}

async function getData() {
  const query = "SELECT * FROM HitMap1";
  await Database.prepare(query).all();
}
const func = {
  addParticipant,
  updateParticipation,
  deleteParticipant,
  getData,
};

export default func;
