import express from 'express';
const router = express.Router();
import utility from '../controllers/utility/utility.js';
import getDayNumber from '../controllers/utility/time.js';

router.get('/day', getDayNumber);

export default router;
