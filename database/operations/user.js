import Database from '../connection.js';

async function getUser(username, password) {
  const query = `SELECT * FROM UserInfo WHERE username = ? AND password = ?`;
  const user = await Database.prepare(query).get(username, password);
  return user;
}
async function addUser(user) {
  const query = `INSERT INTO UserInfo 
    (fullName, username, email, enrollNo, password, phoneNumber) 
    VALUES (?, ?, ?, ?, ?, ?)`;
  try {
    await Database.prepare(query).run(
      user.fullName,
      user.username,
      user.email,
      user.enrollNo,
      user.password,
      user.phoneNumber
    );
  } catch (error) {
    return error;
  }
  return null;
}

async function isUsernameExists(username, email) {
  const query = `SELECT 1 FROM UserInfo WHERE username = ? OR email = ? LIMIT 1`;
  return await Database.prepare(query).get(username, email);
}

const userManager = {
  addUser,
  getUser,
  isUsernameExists,
};
export default userManager;
