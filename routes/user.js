import express from "express";
import userController from "../controllers/user.js";
// import { handleUserLogin, handleUserSignUp } from "../controllers/user.js";
const router = express.Router();

router.post("/signup", userController.handleUserLogin);
router.post("/login", userController.handleUserSignUp);

export default router;
