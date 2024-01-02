import reviewManager from '../database/operations/review.js';
import processedManager from '../database/operations/processed.js';
import heatMapManager from '../database/operations/heatmap.js';
import taskSubmitted from '../database/operations/taskSubmitted.js';
import score from '../database/operations/score.js';
import { v4 as uuidv4 } from 'uuid';
import getDayNumber from '../utility/time.js';

const domains = ['web', 'android', 'ml'];


async function handleAddSubmission(req, res) {
  // req - (datatype : TEXT) - username, driveLink, liveLink(optional), domain
  try {
    const dayNo = req.body.dayNo;
    if (!dayNo) {
      return res.status(400).json({ msg: 'dayNo not specified' });
    }
    const curDayNo = getDayNumber();
    const currentDayNo = curDayNo < 0 ? 0 : curDayNo;
    if (currentDayNo - dayNo < 0) {
      return res
        .status(400)
        .json({ msg: 'dayNo is exceeded the allowed window' });
    }
    //------------------------

    const submission = {
      username: req.user.username,
      driveLink: req.body.driveLink,
      domain: req.body.domain,
      liveLink: req.body.liveLink,
      dayNo: dayNo,
    };

    if (
      !domains.includes(submission.domain) ||
      dayNo > 21 ||
      dayNo < 1 ||
      !submission.driveLink ||
      !submission.username ||
      !submission.domain
    ) {
      return res
        .status(400)
        .json({ msg: 'Domain not specified || userName not included ' });
    }

    const isAlreadySubmitted = await taskSubmitted.checkTaskSubmitted(
      submission.username,
      submission.domain,
      submission.dayNo
    );

    if (isAlreadySubmitted.response === 1) {
      return res.status(200).json({ msg: 'Task already submitted' });
    } else if (isAlreadySubmitted.response === 2) {
      // return res.status(400).json({ msg: isAlreadySubmitted.message });
      if (!(process.env.NODE_ENV == 'production'))
        console.log(isAlreadySubmitted.message);
      return res
        .status(500)
        .json({ msg: "there is some server error. it's me not you !" });
    }

    submission.submissionId = uuidv4();

    const result = await reviewManager.addSubmission(submission);
    if (result === false) {
      return res.status(400).json({ msg: 'not submitted' });
    }
    const updateAlreadySubmittedDb = await taskSubmitted.setTaskSubmitted(
      submission.username,
      submission.domain,
      submission.dayNo
    );
    if (updateAlreadySubmittedDb.response === 2) {
      console.log(
        'race around condition work updated in review submission table but record/log not updated in taskSubmittedDb'
      );
      await taskSubmitted.setTaskSubmitted(
        submission.username,
        submission.domain,
        submission.dayNo
      );
    } else {
      if (!(process.env.NODE_ENV == 'production'))
        console.log('task submitted and updated in taskSubmitted db');
    }
    return res.status(200).json({
      msg: `successfully submitted submissionId:${submission.submissionId}`,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: 'submission aborted server side error!' });
  }
}

async function handleGetParticipantReviewSubmissions(req, res) {
  if (!domains.includes(req.params.domain))
    return res.status(404).json({ msg: 'Domain not specified' });
  const result = await reviewManager.getParticipantReviewSubmissions(
    req.user,
    req.params.domain
  );
  return res.status(200).send(result);
}

async function handleGetAllReviewSubmissions(req, res) {
  if (!domains.includes(req.params.domain))
    return res.status(404).json({ msg: 'Domain not specified' });
  const result = await reviewManager.getAllReviewSubmissions(req.params.domain);
  return res.status(200).send(result);
}

function updateUserHeatmapHelper(submission, userHeatMap) {
  const dayNo = submission.dayNo - 1;
  const array = userHeatMap[submission.domain].split('');
  array[dayNo] = '1';
  userHeatMap[submission.domain] = array.join('');
  return userHeatMap;
}

async function handleSubmissionEvaluation(req, res) {
  const points = parseInt(req.body.points);
  if (isNaN(req.body.points))
    return res.status(404).json({ msg: 'score is null' });

  //when and where will this be called and who will provide
  //submissionId
  const submissionId = req.body.submissionId;

  try {
    const submission = await reviewManager.getSubmissionById(submissionId);

    if (!submission)
      return res.status(400).json({ error: 'No such submission' });

    submission.points = points;
    await reviewManager.deleteSubmission(submissionId);
    await processedManager.addSubmission(submission);
    const updatedScoredReturned = await score.updateScoreUser(
      submission.domain,
      submission.username,
      submission.points
    );

    return res.status(200).json({
      msg: `submission processed updated score ${updatedScoredReturned}`,
    });
  } catch {
    return res.status(400).json({ msg: 'submission not processed' });
  }
}

const handleGetAllUserSubmission = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ msg: 'user not logged in' });
    }
    const processedSubmissionData = await processedManager.getAllProcessedUser(
      req.user.username
    );
    const reviewSubmissionData = await reviewManager.getAllReviewUser(
      req.user.username
    );
    return res.status(200).json({
      accepted: processedSubmissionData,
      underReview: reviewSubmissionData,
    });
  } catch {
    return res
      .status(500)
      .json({ msg: 'server error', accepted: [], underReview: [] });
  }
};

const submissionController = {
  handleGetAllUserSubmission,
  handleAddSubmission,
  handleGetAllReviewSubmissions,
  handleGetParticipantReviewSubmissions,
  handleSubmissionEvaluation,
};
export default submissionController;
