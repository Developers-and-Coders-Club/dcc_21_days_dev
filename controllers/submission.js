import reviewManager from "../db/operations/review.js";

const domains = ["web", "android", "ml"];

async function addSubmission(req, res) {
  // req - (datatype : TEXT) - username, driveLink, liveLink(optional), domain, dayNo
  const submission = req.body;
  submission.submissionId =
    Date.now() + submission.username + submission.domain + submission.dayNo;
  const result = await reviewManager.addSubmission(submission);
  if (result.error) return res.status(404).send(result);
  res.status(200).json({ msg: "successfully submitted" });
}

async function handleGetParticipantReviewSubmissions(req, res) {
  if (!domains.includes(req.params.domain))
    return res.status(404).json({ msg: "Domain not specified" });
  const result = await reviewManager.getParticipantReviewSubmissions(
    req.user,
    req.params.domain
  );
  return res.status(200).send(result);
}

async function handleGetAllReviewSubmissions(req, res) {
  if (!domains.includes(req.params.domain))
    return res.status(404).json({ msg: "Domain not specified" });
  const result = await reviewManager.getAllReviewSubmissions(req.params.domain);
  return res.status(200).send(result);
}

async function handleSubmissionEvaluation(req, res) {
  if (!domains.includes(req.params.domain))
    return res.status(404).json({ msg: "Domain not specified" });
  const submissionId = req.body.submissionId;
  const accept = req.body.accept;
  if(accept === true)
  {
    
  }
}

const submissionController = {
  addSubmission,
  handleGetAllReviewSubmissions,
  handleGetParticipantReviewSubmissions,
  handleSubmissionEvaluation,
};
export default submissionController;
