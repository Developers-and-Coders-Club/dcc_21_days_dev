import score from '../database/operations/score.js';

//[{"username":username,"score":score}]
const handleGetLeaderboard = async (req, res) => {
  try {
    const domain = req.params.domain;
    if (!domain) throw new Error('domain not specified');
    const leaderboard = await score.getScoresDomain(domain);
    return res.status(200).send(leaderboard);
  } catch (err) {
    console.error('cannot fetch leaderboard', err);
    return res.status(500).send([]);
  }
};

const handleGetScoreAllDomains = async (req, res) => {
  try {
    const scoreAllDomains = await score.getScoreAllDomains();
    return res.status(200).send(scoreAllDomains);
  } catch (err) {
    console.error('cannot fetch score for all domains', err);
    return res.status(500).send([]);
  }
};

const leaderboardController = {
  handleGetLeaderboard,
  handleGetScoreAllDomains,
};

export default leaderboardController;
