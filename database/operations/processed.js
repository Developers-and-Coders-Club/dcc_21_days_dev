import Database from "../connection.js";

async function addSubmission(submission) {
  const query = `INSERT INTO processedSubmissionTable VALUES (?, ?, ?, ?, ?, ?, ?)`;
  await Database.prepare(query).run(
    submission.submissionId,
    submission.username,
    submission.driveLink,
    submission.liveLink,
    submission.domain,
    submission.dayNo,
    submission.points,
  );
}

//[{submissionId, username, driveLink, liveLink, domain, dayNo, points }]
async function getAllProcessedUser(username) {
  try
  {
    const query = `SELECT * FROM processedSubmissionTable WHERE username = ?`;
    const result= await Database.prepare(query).all(username);
    return result;
  }
  catch
  {
    console.log("Error in getAllProcessedUser");
    return [];
  }
}

const processedManager = {
    addSubmission,
    getAllProcessedUser,
}

export default processedManager;