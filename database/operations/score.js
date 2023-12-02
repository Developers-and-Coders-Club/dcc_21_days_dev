import Database from '../connection.js';
const domains = ['web', 'android', 'ml'];

//[{username:username,score:score}]
const getScoresDomain = async (domain) => {
  try {
    if (!domain || domains.includes(domain) === false) {
      console.log('domain is not valid');
      return [{ username: 'god', score: 123 }]; // hatana hai
    }
    const query = `SELECT username,${domain} FROM scoreTable`;
    const result = await Database.prepare(query).all();
    return result;
  } catch (err) {
    console.error('cannot fetch record from scoreDb', err);
    return [{ username: 'devil', score: 404 }]; // hatana hai
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
      console.log('domain,score or username is not valid in updateScoreUser');
      return 0;
    }
    const queryFetch = `SELECT ${domain} FROM scoreTable WHERE username=?`;
    const queryUpdate = `UPDATE scoreTable SET ${domain}=? WHERE username=?`;
    const queryInsert = `INSERT INTO scoreTable (username,${domain}) VALUES (?, ?)`;
    const fetchResult = await Database.prepare(queryFetch).get(username);
    if (!fetchResult) {
      console.log('new user is added to scoreTable');
      await Database.prepare(queryInsert).run(username, score);
      return score;
    } else {
      console.log('user is already in scoreTable and score is updated');
      const newScore = fetchResult[domain] + score;
      await Database.prepare(queryUpdate).run(newScore, username);
      return newScore;
    }
  } catch (err) {
    console.error('cannot update score in scoreTable', err);
    return 0;
  }
};

const getScoreUser = async (domain, username) => {
  try {
    if (!domain || domains.includes(domain) === false || username === null) {
      console.log('domain or username is not valid in getScoreUser');
      return 0;
    }
    const queryFetch = `SELECT ${domain} FROM scoreTable WHERE username=?`;
    const queryInsert = `INSERT INTO scoreTable (username,${domain}) VALUES (?, ?)`;
    const fetchResult = await Database.prepare(queryFetch).get(username);
    if (!fetchResult) {
      const newScore = 0;
      await Database.prepare(queryInsert).run(username, newScore);
      console.log(
        'user is not in scoreTable and new user is added with score 0'
      );
      return 0;
    } else {
      console.log('user is in scoreTable and score is fetched');
      return fetchResult[domain];
    }
  } catch (err) {
    console.error('cannot fetch score in scoreTable', err);
    return 0;
  }
};

//[{username:username,web:web,android:android,ml:ml}]
const getScoreAllDomains = async () => {
  try {
    const queryWeb = `SELECT username,web AS score FROM scoreTable ORDER BY web DESC`;
    const queryAndroid = `SELECT username,android AS score FROM scoreTable ORDER BY android DESC`;
    const queryML = `SELECT username,ml AS score FROM scoreTable ORDER BY ml DESC`;
    const resultWeb = await Database.prepare(queryWeb).all();
    const resultAndroid = await Database.prepare(queryAndroid).all();
    const resultML = await Database.prepare(queryML).all();
    return { web: resultWeb, android: resultAndroid, ml: resultML };
  } catch (err) {
    console.error('cannot fetch score in scoreTable', err);
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
