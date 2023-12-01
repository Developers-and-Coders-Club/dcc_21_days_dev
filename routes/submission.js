import express from "express";
import authMiddleware from "../middlewares/auth.js";
import submissionController from "../controllers/submission.js";

const router = express.Router();

const restrictTo = authMiddleware.restrictTo;

router.post(
  "/",
  restrictTo(["PARTICIPANT", "ADMIN"]),
  submissionController.handleAddSubmission
);

router.get(
  "/my/:domain",
  restrictTo(["PARTICIPANT", "ADMIN"]),
  submissionController.handleGetParticipantReviewSubmissions
);

router.get(
  "/all/:domain",
  restrictTo(["ADMIN"]),
  submissionController.handleGetAllReviewSubmissions
);

router.post(
  "/evaluation",
  restrictTo(["ADMIN"]),
  submissionController.handleSubmissionEvaluation
);

export default router;
