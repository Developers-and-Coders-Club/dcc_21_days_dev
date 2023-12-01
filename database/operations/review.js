import Database from "../connection.js";

async function getSubmission(submissionId) {
  const query = `SELECT * FROM reviewSubmissionTable WHERE submissionId = ?`;
  return await Database.prepare(query).get(submissionId);
}

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
  
  async function deleteSubmission(submissionId) {
    const query = `DELETE FROM reviewSubmissionTable WHERE submissionId = ?`;
    return await Database.prepare(query).run(submissionId);
  }
  
  async function getParticipantReviewSubmissions(user, domain) {
    const query = `SELECT * FROM reviewSubmissionTable WHERE username = ? AND domain = ?`;
  return await Database.prepare(query).all(user.username, domain);
}

async function getAllReviewSubmissions(domain) {
  const query = "SELECT * FROM reviewSubmissionTable WHERE domain = ?";
  return await Database.prepare(query).all(domain);
}

const reviewManager = {
  addSubmission,
  getSubmission,
  deleteSubmission,
  getParticipantReviewSubmissions,
  getAllReviewSubmissions,
};

export default reviewManager;