import Database from "../connection.js";
const domains = ["web", "android", "ml"];

//[{username:username,score:score}]
const getScoresDomain = async (domain) => {
  try {
    if (!domain || domains.includes(domain) === false) {
      console.log("domain is not valid");
      return [{ username: "god", score: 123 }]; // hatana hai
    }
    const query = `SELECT username,${domain} FROM scoreTable`;
    const result = await Database.prepare(query).all();
    return result;
  } catch {
    console.log("cannot fetch record from scoreDb");
    return [{ username: "devil", score: 404 }]; // hatana hai
  }
};

//score is a number
const updateScoreUser = async (domain, username, score) => {
  try {
    if (
      !domain ||
      domains.includes(domain) === false ||
      isNaN(score) ||
      !username
    ) {
      console.log("domain,score or username is not valid in updateScoreUser");
      return 0;
    }
    const queryFetch = `SELECT ${domain} FROM scoreTable WHERE username=?`;
    const queryUpdate = `UPDATE scoreTable SET ${domain}=? WHERE username=?`;
    const queryInsert = `INSERT INTO scoreTable (username,${domain}) VALUES (?, ?)`;
    const fetchResult = await Database.prepare(queryFetch).get(username);
    console.log(fetchResult);
    if (fetchResult === null || fetchResult[domain] === null) {
      console.log("new user is added to scoreTable");
      await Database.prepare(queryInsert).run(username, score);
      return score;
    } else {
      console.log("user is already in scoreTable and score is updated");
      const newScore = fetchResult[domain] + score;
      await Database.prepare(queryUpdate).run(newScore, username);
      return newScore;
    }
  } catch {
    console.log("cannot update score in scoreTable");
    return 0;
  }
};

const getScoreUser = async (domain, username) => {
  try {
    if (!domain || domains.includes(domain) === false || username === null) {
      console.log("domain or username is not valid in getScoreUser");
      return 0;
    }
    const queryFetch = `SELECT ${domain} FROM scoreTable WHERE username=?`;
    const queryInsert = `INSERT INTO scoreTable (username,${domain}) VALUES (?, ?)`;
    const fetchResult = await Database.prepare(queryFetch).get(username);
    if (fetchResult === null) {
      const newScore = 0;
      await Database.prepare(queryInsert).run(username, newScore);
      console.log(
        "user is not in scoreTable and new user is added with score 0"
      );
      return 0;
    } else {
      console.log("user is in scoreTable and score is fetched");
      return fetchResult[domain];
    }
  } catch {
    console.log("cannot fetch score in scoreTable");
    return 0;
  }
};

//[{username:username,web:web,android:android,ml:ml}]
const getScoreAllDomains = async () => {
  try {
    const query = `SELECT username,web,android,ml FROM scoreTable`;
    const result = await Database.prepare(query).all();
    return result;
  } catch {
    console.log("cannot fetch score in scoreTable");
    return [];
  }
};

const score = {
  getScoresDomain,
  updateScoreUser,
  getScoreUser,
  getScoreAllDomains,
};

export default score;
