
import heatMapManager from "../database/operations/heatmap.js";

async function handleGetLeaderboard(req, res) {
    const heatmap = await heatMapManager.getHeatMap();
    console.log(heatmap);
    return res.status(200).send(heatmap);
}

const leaderboardController = {
    handleGetLeaderboard,
}

export default leaderboardController;