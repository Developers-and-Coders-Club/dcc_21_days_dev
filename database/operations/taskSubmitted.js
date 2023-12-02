import Database from "../connection.js";
const domains = ["web", "android", "ml"];
//2--> error
const checkTaskSubmitted = async (username, domain, day) => {
  try {
    if (
      username === null ||
      day === null ||
      day > 21 ||
      !domains.includes(domain)
    ) {
      return { response: 2, message: "day is greater 21 or null" };
    }
    const query = `SELECT ${domain} FROM userAlreadySubmittedTable WHERE username=?`;
    let result = await Database.prepare(query).get(username);
    if (result === null) {
      return { response: 0, message: "user not found" };
    }
    //{web:000000000000000000000}
    result = result[domain];
    if (result[day - 1] === "1") {
      return { response: 1, message: "task already submitted before" };
    } else {
      return { response: 0, message: "task not submitted before" };
    }
  } catch {
    return { response: 2, message: "can't read from db" };
  }
};

const setTaskSubmitted = async (username, domain, day) => {
  try {
    if (
      username === null ||
      day === null ||
      day > 21 ||
      !domains.includes(domain)
    ) {
      return { response: 2, message: "day is greater 21 or null" };
    }
    const queryInsert = `INSERT INTO userAlreadySubmittedTable (username,${domain}) VALUES (?, ?)`;
    const queryFetch = `SELECT ${domain} FROM userAlreadySubmittedTable WHERE username=?`;
    const queryUpdate = `UPDATE userAlreadySubmittedTable SET ${domain}=? WHERE username=?`;
    const result = await Database.prepare(queryFetch).get(username); //result is a string of 21 characters
    if (result === null) {
      const newHeatMap = "0".repeat(21);
      let newTaskSubmitted = newHeatMap.split("");
      newTaskSubmitted[day - 1] = "1";
      newTaskSubmitted = newTaskSubmitted.join("");
      await Database.prepare(queryInsert).run(username, newTaskSubmitted);
      return {
        response: 1,
        message: `new user is added and task is submitted for them ${username}`,
      };
    } else {
      let newTaskSubmitted = result.split("");
      newTaskSubmitted[day - 1] = "1";
      newTaskSubmitted = newTaskSubmitted.join("");
      await Database.prepare(queryUpdate).run(newTaskSubmitted, username);
      return {
        response: 1,
        message: `task submitted successfully ${username}`,
      };
    }
  } catch {
    return { response: 2, message: "can't write to db" };
  }
};

const taskSubmitted = {
  checkTaskSubmitted,
  setTaskSubmitted,
};

export default taskSubmitted;
