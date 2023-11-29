import Database from "../connection.js";

async function addSubmission(submission) {
  const dayNo = await parseInt(submission.dayNo);
  if (isNaN(dayNo) || dayNo < 1 || dayNo > 21) {
    return { error: "Invalid dayNo" };
  }
  const query = `INSERT INTO reviewSubmissionTable VALUES (?, ?, ?, ?, ?, ?)`;
  await Database.prepare(query).run(
    submission.submissionId,
    submission.username,
    submission.driveLink,
    submission.liveLink,
    submission.domain,
    dayNo
  );
}
async function getParticipantReviewSubmissions(user, domain) {
  const query = "SELECT * FROM reviewSubmissionTable WHERE username = ? AND domain = ?";
  return await Database.prepare(query).get(user.username, domain);
}

async function getAllReviewSubmissions(domain) {
  const query = "SELECT * FROM reviewSubmissionTable WHERE domain = ?";
  return await Database.prepare(query).get(domain);
}

const reviewManager = {
  addSubmission,
  getParticipantReviewSubmissions,
  getAllReviewSubmissions,
};

export default reviewManager;
