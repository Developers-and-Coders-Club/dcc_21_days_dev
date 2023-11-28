import reviewManager from "../db/CRUD ops/review.js";
import authService from "../service/auth.js";

async function addSubmission(req, res) {
  const user = authService.getUser(req.token);
  if (!user) {
    return res.status(400).json({ msg: "Login Required" });
  }
  const submission = req.body;
  submission.submissionId =
    Date.now() + submission.username + submission.domain + submission.dayNo;
  await reviewManager.addSubmission(submission);
  res.status(200).json({ msg: "successfully submitted" });
}

async function handleGetParticipantReviewSubmissions(req, res) {
  const result = await getParticipantReviewSubmissions(user, req.domain);
  console.log(result);
  return res.status(200).json({ result });
}

async function handleGetAllReviewSubmissions(req, res) {
  const result = await getParticipantReviewSubmissions(req.domain);
  return res.status(200).json({ result });
}
const submissionController = {
  addSubmission,
  handleGetAllReviewSubmissions,
  handleGetParticipantReviewSubmissions,
};
export default submissionController;
