import reviewManager from "../database/operations/review.js";
import processedManager from "../database/operations/processed.js";
import heatMapManager from "../database/operations/heatmap.js";
import taskSubmitted from "../database/operations/taskSubmitted.js";
import score from "../database/operations/score.js";

const domains = ["web", "android", "ml"];

// Function to get local time in a specific time zone
function getLocalTime(timezone) {
  const options = { timeZone: timezone };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const localTime = new Date(formatter.format(new Date()));
  return localTime;
}

// Function to calculate the difference in days between two dates
function calculateDaysDifference(date1, date2) {
  const timeDifference = date1.getTime() - date2.getTime();
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  return Math.floor(daysDifference);
}

function getDayNumber() {
  // Set the target date (5 Nov 2023 12:00 AM in Asia/Kolkata)
  const targetDate = new Date("2023-12-05T00:00:00Z");
  targetDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  // Get the current local time in Asia/Kolkata
  const currentTimeInAsiaKolkata = getLocalTime("Asia/Kolkata");

  // Calculate the difference in days
  const daysDifference = calculateDaysDifference(
    currentTimeInAsiaKolkata,
    targetDate
  );

  return daysDifference + 1; // change required
}

async function handleAddSubmission(req, res) {
  // req - (datatype : TEXT) - username, driveLink, liveLink(optional), domain
  try {
    const dayNo = getDayNumber(); //change required before testing
    // const dayNo=1;

    const submission = {
      username: req.body.username,
      driveLink: req.body.driveLink,
      domain: req.body.domain,
      liveLink: req.body.liveLink,
      dayNo: dayNo,
    };

    if (
      (!domains.includes(submission.domain),
      dayNo > 21,
      dayNo < 1,
      submission.driveLink === null,
      submission.username === null,
      submission.domain === null)
    ) {
      return res
        .status(400)
        .json({ msg: "Domain not specified || userName not included " });
    }

    const isAlreadySubmitted = await taskSubmitted.checkTaskSubmitted(
      submission.username,
      submission.domain,
      submission.dayNo
    );

    if (isAlreadySubmitted.response === 1) {
      return res.status(200).json({ msg: "Task already submitted" });
    } else if (isAlreadySubmitted.response === 2) {
      return res.status(400).json({ msg: isAlreadySubmitted.message });
    }

    //change required before testing deployment
    submission.submissionId =
      Date.now() + submission.username + submission.domain + submission.dayNo;
    // submission.submissionId = Date.now(); // Date.now() + submission.username + submission.domain + submission.dayNo;

    const result = await reviewManager.addSubmission(submission);
    if (result === false) {
      return res.status(400).json({ msg: "not submitted" });
    }
    const updateAlreadySubmittedDb = await taskSubmitted.setTaskSubmitted(
      submission.username,
      submission.domain,
      submission.dayNo
    );
    if (updateAlreadySubmittedDb.response === 2) {
      console.log(
        "race around condition updated but record not write in taskSubmitted db"
      );
      await taskSubmitted.setTaskSubmitted(
        submission.username,
        submission.domain,
        submission.dayNo
      );
    } else {
      console.log("task submitted and updated in taskSubmitted db");
    }
    return res.status(200).json({
      msg: `successfully submitted submissionId:${submission.submissionId}`,
    });
  } catch {
    return res.status(400).json({ msg: "submission aborted" });
  }
  // const dayNo = getDayNumber();
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
  if (!domains.includes(req.body.domain))
    return res.status(404).json({ msg: "Domain not specified" });
  if (!req.body.points)
    return res.status(404).json({ msg: "score field is integer" });

  //when and where will this be called and who will provide
  //submissionId
  const submissionId = req.body.submissionId;
  const points = parseInt(req.body.points);

  try {
    const submission = await reviewManager.getSubmission(submissionId);

    if (!submission)
      return res.status(400).json({ error: "No such submission" });

    submission.points = points;
    await reviewManager.deleteSubmission(submissionId);
    await processedManager.addSubmission(submission);
    const updatedScoredReturned=await score.updateScoreUser(
      req.body.domain,
      submission.username,
      submission.points
    );

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
    return res.status(200).json({ msg: `submission processed updated score ${updatedScoredReturned}` });
  } catch {
    return res.status(400).json({ msg: "submission not processed" });
  }
}

const submissionController = {
  handleAddSubmission,
  handleGetAllReviewSubmissions,
  handleGetParticipantReviewSubmissions,
  handleSubmissionEvaluation,
};
export default submissionController;
