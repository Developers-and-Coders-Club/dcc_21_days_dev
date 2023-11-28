import reviewManager from "../db/CRUD ops/review.js";
import authService from "../service/auth.js";

async function addSubmission(req, res) {
  // req - 
      // username TEXT NOT NULL,
      // driveLink TEXT NOT NULL,
      // liveLink TEXT,
      // domain TEXT NOT NULL,
      // dayNo INT NOT NULL
  const submission = req.body;
  submission.submissionId =
    Date.now() + submission.username + submission.domain + submission.dayNo;
  await reviewManager.addSubmission(submission);
  res.status(200).json({ msg: "successfully submitted" });
}

async function handleGetParticipantReviewSubmissions(req, res) {
  const result = await reviewManager.getParticipantReviewSubmissions(req.user, req.headers.domain);
  return res.status(200).send(result);
}

async function handleGetAllReviewSubmissions(req, res) {
  const result = await reviewManager.getParticipantReviewSubmissions(req.domain);
  return res.status(200).send(result);
}
const submissionController = {
  addSubmission,
  handleGetAllReviewSubmissions,
  handleGetParticipantReviewSubmissions,
};
export default submissionController;
