import express from "express";
import leaderboardController from "../controllers/leaderboard.js";

const router = express.Router();

router.get('/all', leaderboardController.handleGetScoreAllDomains);
// router.get('/:domain', leaderboardController.handleGetLeaderboard);

export default router;