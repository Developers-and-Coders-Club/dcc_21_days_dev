import express from "express";
import leaderboardController from "../controllers/leaderboard.js";

const router = express.Router();

router.get('/', leaderboardController.handleGetLeaderboard);
router.get('/all', leaderboardController.handleGetScoreAllDomains);

export default router;