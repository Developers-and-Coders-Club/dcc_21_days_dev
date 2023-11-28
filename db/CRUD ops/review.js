import Database from "../connection.js";

async function addSubmission(submission) {
  const query = `INSERT INTO reviewTable VALUES (?, ?, ?, ?, ?, ?)`;
  await Database.prepare(query).run(
    submission.submissionId,
    submission.username,
    submission.driveLink,
    submission.liveLink,
    submission.domain,
    submission.dayNo
  );
}
async function getParticipantReviewSubmissions(user, domain) {
  const query = "SELECT * FROM reviewTable WHERE username = ? AND domain = ?";
  return await Database.prepare(query).get(user.username, domain);
}

async function getAllReviewSubmissions(domain) {
  const query = "SELECT * FROM reviewTable WHERE domain = ?";
  return await Database.prepare(query).get(domain);
}

const reviewManager = {
  addSubmission,
  getParticipantReviewSubmissions,
  getAllReviewSubmissions,
};

export default reviewManager;
