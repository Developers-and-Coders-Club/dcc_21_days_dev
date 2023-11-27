import Database from "../connection.js";

async function addUser(user) {
  const query = `INSERT INTO UserInfo 
    (username, email, enrollNo, password, phoneNumber) 
    VALUES (?, ?, ?, ?, ?)`;
  try {
    await Database.prepare(query).run(
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
  const result = Database.prepare(query).get(username, email);
  return result;
}

const userManager = {
  addUser,
  isUsernameExists,
};
export default userManager;
