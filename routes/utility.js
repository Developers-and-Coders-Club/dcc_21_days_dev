import express from "express";
const router = express.Router();
import utility from "../controllers/utility/utility.js";

router.get("/date", utility.getDayNumber);

export default router;
