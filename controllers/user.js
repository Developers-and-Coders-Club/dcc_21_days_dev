import userManager from "../db/CRUD ops/user.js";
import authService from "../service/auth.js";

async function handleUserLogin(req, res) {
  const { username, password } = req.body;
  const user = await userManager.getUser(username, password);
  if (!user) {
    return res.status(400).json({ error: "Invalid username or password" });
  }
  const token = authService.setUser(user);
  console.log(token);
  return res.status(200).json({ token: token });
}

async function handleUserSignUp(req, res) {
  const user = req.body;
  if (
    !user ||
    !user.username ||
    !user.email ||
    !user.enrollNo ||
    !user.password ||
    !user.phoneNumber
  )
    return res.status(404).json({ msg: "Invalid request" });

  if (await userManager.isUsernameExists(user.username, user.email))
    return res.status(400).json({ msg: "User already created" });

  const error = await userManager.addUser(user);
  if (error) return res.status(500).json({ error: error });
  return res.status(200).json({ msg: `${user.username} added successfully` });
}

const userController = {
  handleUserLogin,
  handleUserSignUp
};

export default userController;
