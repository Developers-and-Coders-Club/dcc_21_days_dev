import Database from '../connection.js';
const domains = ['web', 'android', 'ml'];

// 0 - some error
// 1 - invalid domain or dayNo
// 2 - task is not set
// 3 - task is set
// 4 - task is updated
// 5 - task found

const updateTask = async (domain, dayNo, taskTitle, taskDescription) => {
  try {
    dayNo = parseInt(dayNo);
    if (
      !domain ||
      domains.includes(domain) === false ||
      !dayNo ||
      !taskTitle ||
      !taskDescription
    ) {
      console.log('domain,dayNo or task is not valid in setTask');
      return { response: 1 };
    }
    // const query = `UPDATE taskTable SET ${domain}=? WHERE dayNo=?`;
    const searchQuery = `SELECT * FROM taskTable${domain} WHERE dayNo=?`;
    const fetchResult = await Database.prepare(searchQuery).get(dayNo);
    if (!fetchResult) {
      console.log('task is not set');
      return { response: 2 };
    }
    const query = `UPDATE taskTable${domain} SET title=?, description=? WHERE dayNo=?`;
    await Database.prepare(query).run(taskTitle, taskDescription, dayNo);
    console.log('task is updated');
    return { response: 4 };
  } catch (err) {
    console.error('cannot update task in taskTable', err);
    return { response: 0 };
  }
};

const setTask = async (domain, dayNo, taskTitle, taskDescription) => {
  try {
    dayNo = parseInt(dayNo);
    if (
      !domain ||
      domains.includes(domain) === false ||
      !dayNo ||
      !taskTitle ||
      !taskDescription
    ) {
      console.log('domain,dayNo or task is not valid in setTask');
      return { response: 1 };
    }
    const query = `INSERT INTO taskTable${domain} (dayNo,title,description) VALUES (?, ?, ?)`;
    await Database.prepare(query).run(dayNo, taskTitle, taskDescription);
    console.log('task is set');
    return { response: 3 };
  } catch (err) {
    console.error('cannot set task in taskTable', err);
    return { response: 0 };
  }
};

const getTask = async (domain, dayNo) => {
  try {
    dayNo = parseInt(dayNo);
    if (!domain || domains.includes(domain) === false || !dayNo) {
      console.log('domain or dayNo is not valid in getTask');
      return { response: 1 };
    }
    const query = `SELECT * FROM taskTable${domain} WHERE dayNo=?`;
    const fetchResult = await Database.prepare(query).get(dayNo);
    if (!fetchResult) {
      console.log('task is not set');
      return { response: 2 };
    } else {
      console.log('task is fetched');
      return { response: 5, fetchResult };
    }
  } catch (err) {
    console.error('cannot fetch task in taskTable', err);
    return { response: 0 };
  }
};

function getAllTask(domain) {
  try {
    if (!domain || domains.includes(domain) === false) {
      console.log('domain is not valid in getAllTask');
      return { response: 1 };
    }
    const query = `SELECT * FROM taskTable${domain} ORDER BY dayNo ASC`;
    const fetchResult = Database.prepare(query).all();
    console.log('all task is fetched');
    return { response: 5, fetchResult };
  } catch (err) {
    console.error('cannot fetch all task in taskTable', err);
    return { response: 0 };
  }
}

const taskManager = {
  setTask,
  getTask,
  updateTask,
  getAllTask,
};

export default taskManager;
