import express from "express";
import authMiddleware from "../middlewares/auth.js";
import submissionController from "../controllers/submission.js";
const router = express.Router();

const checkForAuthentication = authMiddleware.checkForAuthentication;

router.get("/submissions/my", checkForAuthentication, submissionController.handleGetParticipantReviewSubmissions);
// router.get("/submissions/all", checkForAuthentication, submissionController.handleGetAllReviewSubmissions);
// router.get("/submissions/evaluation", checkForAuthentication, submissionController.handleSubmissionEvaluation);
// router.get("/leaderboard", handleLeaderboard);
export default router;