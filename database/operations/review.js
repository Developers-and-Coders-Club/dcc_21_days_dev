import Database from "../connection.js";

async function getSubmissionById(submissionId) {
  const query = `SELECT * FROM reviewSubmissionTable WHERE submissionId = ?`;
  return await Database.prepare(query).get(submissionId);
}

// some ghapla
async function addSubmission(submission) {
  const dayNo = await parseInt(submission.dayNo);
  if (isNaN(dayNo) || dayNo < 1 || dayNo > 21) {
    return false;
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
  return true;
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

async function getAllReviewUser(username) {
  try {
    const query = `SELECT * FROM reviewSubmissionTable WHERE username = ?`;
    const result = await Database.prepare(query).all(username);
    return result;
  } catch {
    console.log("Error in getAllProcessedUser");
    return [];
  }
}

const reviewManager = {
  getAllReviewUser,
  addSubmission,
  getSubmissionById,
  deleteSubmission,
  getParticipantReviewSubmissions,
  getAllReviewSubmissions,
};

export default reviewManager;
