import taskManager from '../database/operations/task.js';

async function handleGetTask(req, res) {
  const { domain, dayNo } = req.params;
  const result = await taskManager.getTask(domain, dayNo);
  if (result.response == 0)
    return res.status(500).json({ msg: 'server error' });
  if (result.response === 1)
    return res
      .status(400)
      .json({ msg: 'domain or dayNo is not valid in getTask' });
  if (result.response === 2)
    return res
      .status(404)
      .json({ msg: `task is not yet set for the day ${dayNo}` });
  return res.status(200).send(result.fetchResult);
}

async function handleSetTask(req, res) {
  const { domain, dayNo, title, description } = req.body;
  const result = await taskManager.setTask(domain, dayNo, title, description);
  if (result.response == 0)
    return res.status(500).json({ msg: 'server error' });
  if (result.response === 1)
    return res
      .status(400)
      .json({ msg: 'domain or dayNo is not valid in getTask' });
  if (result.response === 3)
    return res
      .status(201)
      .json({ msg: `task for day ${dayNo} has been set successfully` });
  if (result.response === 4)
    return res
      .status(200)
      .json({ msg: `task for day ${dayNo} has been updated successfully` });
}

// async function handleUpdateTask(req, res) {
//   const { domain, dayNo, title, description } = req.body;
//   const result = await taskManager.updateTask(
//     domain,
//     dayNo,
//     title,
//     description
//   );
//   if (result.response == 0)
//     return res.status(500).json({ msg: 'server error' });
//   if (result.response === 1)
//     return res
//       .status(404)
//       .json({ msg: 'domain or dayNo is not valid in getTask' });
//   if (result.response === 2)
//     return res
//       .status(200)
//       .json({ msg: `task is not yet set for the day ${dayNo}` });
//   return res
//     .status(200)
//     .json({ msg: `task for day ${dayNo} has been updated successfully` });
// }

function handleGetAllTask(req, res) {
  const { domain } = req.params;
  const result = taskManager.getAllTask(domain);
  if (result.response == 0)
    return res.status(500).json({ msg: 'server error' });
  if (result.response === 1)
    return res.status(400).json({ msg: 'domain is not valid in getAllTask' });
  return res.status(200).send(result.fetchResult);
}

const taskController = {
  handleGetTask,
  handleSetTask,
  // handleUpdateTask,
  handleGetAllTask,
};

export default taskController;
