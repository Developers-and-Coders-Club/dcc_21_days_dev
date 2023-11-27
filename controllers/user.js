import userManager from "../db/CRUD ops/user.js";

async function handleUserLogin(req, res) {
  const {username} = req.body;
  
  return res.json({ msg: "login" });
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
  if(error)
    return res.status(500).json({error: error});
  return res.status(200).json({ msg: `${user.username} added successfully` });
}

async function handleUserLogout(req, res) {}

const userController = {
  handleUserLogin,
  handleUserSignUp,
  handleUserLogout,
};

export default userController;
