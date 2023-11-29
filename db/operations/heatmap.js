import Database from "../connection";

async function addParticipant(username) {
  const query = `INSERT INTO heatmap (username) VALUES (?)`;
  await Database.prepare(query).run(username);
}

async function updateParticipation(name, dayNo) {
  if (isNaN(dayNo)) {
    throw new Error("Day number is not a number");
  }
  const query = `UPDATE heatmap set day${dayNo} = ? WHERE name = ?`;
  await Database.prepare(query).run(1, name);
}

async function deleteParticipant(name) {
  const query = `DELETE FROM heatmap WHERE name = ?`;
  await Database.prepare(query).run(name);
}

async function getData() {
  const query = "SELECT * FROM heatmap";
  await Database.prepare(query).all();
}
const func = {
  addParticipant,
  updateParticipation,
  deleteParticipant,
  getData,
};

export default func;
