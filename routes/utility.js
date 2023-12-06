import express from 'express';
const router = express.Router();
import utility from '../controllers/utility.js';

router.get('/day', utility.handleGetDayNumber);

export default router;
