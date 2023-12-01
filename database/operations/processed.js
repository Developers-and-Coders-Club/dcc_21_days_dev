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

const processedManager = {
    addSubmission,
}

export default processedManager;