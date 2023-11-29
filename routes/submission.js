import express from "express";
import authMiddleware from "../middlewares/auth.js";
import submissionController from "../controllers/submission.js";

const router = express.Router();

const restrictTo = authMiddleware.restrictTo;

router.post(
  "/my/:domain",
  restrictTo(["PARTICIPANT", "ADMIN"]),
  submissionController.handleGetParticipantReviewSubmissions
);
router.post(
  "/all/:domain",
  restrictTo(["ADMIN"]),
  submissionController.handleGetAllReviewSubmissions
);
router.post(
  "/evaluation/:domain",
  restrictTo(["ADMIN"]),
  submissionController.handleSubmissionEvaluation
);

export default router;
