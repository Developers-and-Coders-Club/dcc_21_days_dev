import reviewManager from "../database/operations/review.js";
import processedManager from "../database/operations/processed.js";
import heatMapManager from "../database/operations/heatmap.js";

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

function updateUserHeatmapHelper(submission, userHeatMap) {
  const dayNo = submission.dayNo - 1;
  const array = userHeatMap[submission.domain].split("");
  array[dayNo] = "1";
  userHeatMap[submission.domain] = array.join("");
  return userHeatMap;
}

async function handleSubmissionEvaluation(req, res) {
  if (!domains.includes(req.params.domain))
    return res.status(404).json({ msg: "Domain not specified" });

  const submissionId = req.body.submissionId;
  const accept = parseInt(req.body.accept);

  if (accept == null || !(accept in [0, 1]))
    return res.status(404).json({ msg: "accept field is boolean" });

  const submission = await reviewManager.getSubmission(submissionId);

  if (!submission) return res.status(400).json({ error: "No such submission" });

  if (accept === 1) {
    submission.verdict = "accepted";
  } else submission.verdict = "rejected";

  await reviewManager.deleteSubmission(submissionId);
  await processedManager.addSubmission(submission);

  if (accept === 1) {
    const userHeatMap = await heatMapManager.getParticipantHeatMap(
      submission.username
    );
    const newUserHeatMap = updateUserHeatmapHelper(submission, userHeatMap);
    await heatMapManager.updateParticipantHeatMap(
      submission.username,
      submission.domain,
      newUserHeatMap
    );
  }
  res.status(200).json({ msg: "submission processed" });
}

const submissionController = {
  addSubmission,
  handleGetAllReviewSubmissions,
  handleGetParticipantReviewSubmissions,
  handleSubmissionEvaluation,
};
export default submissionController;
