import heatMapManager from "../database/operations/heatmap.js";

import score from "../database/operations/score.js";

// async function handleGetLeaderboard(req, res) {
//     const heatmap = await heatMapManager.getHeatMap();
//     console.log(heatmap);
//     return res.status(200).send(heatmap);
// }

//[{"username":username,"score":score}]
const handleGetLeaderboard = async (req, res) => {
  try {
    const domain = req.params.domain;
    const leaderboard = await score.getScoresDomain(domain);
    return res.status(200).send(leaderboard);
  } catch {
    console.log("cannot fetch leaderboard");
    return res.status(500).send([]);
  }
};

const handleGetScoreAllDomains = async (req, res) => {
  try {
    const scoreAllDomains = await score.getScoreAllDomains();
    return res.status(200).send(scoreAllDomains);
  } catch {
    console.log("cannot fetch score for all domains");
    return res.status(500).send([]);
  }
};

const leaderboardController = {
  handleGetLeaderboard,
  handleGetScoreAllDomains,
};

export default leaderboardController;
