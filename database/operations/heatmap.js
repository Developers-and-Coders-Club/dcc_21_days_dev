import Database from "../connection.js";

async function getParticipantHeatMap(username) {
  const query = `SELECT * FROM heatmap WHERE username = ?`;
  return await Database.prepare(query).get(username);
}

async function getHeatMap() {
  const query = `SELECT * FROM heatmap`;
  return await Database.prepare(query).all();
}

async function updateParticipantHeatMap(username, domain, newUserHeatMap) {
  const query = `UPDATE heatmap SET ${domain} = ? WHERE username = ?`;
  await Database.prepare(query).run(newUserHeatMap[domain], username);
}

const heatMapManager = {
  getHeatMap,
  getParticipantHeatMap,
  updateParticipantHeatMap
};

export default heatMapManager;
