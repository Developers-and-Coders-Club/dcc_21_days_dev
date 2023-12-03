import express from 'express';
const router = express.Router();
import utility from '../controllers/utility/utility.js';

router.get('/day', utility.getDayNumber);

export default router;
