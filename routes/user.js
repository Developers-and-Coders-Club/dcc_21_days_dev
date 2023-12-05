import express from 'express';
import userController from '../controllers/user.js';

const router = express.Router();

router.post('/signup', userController.handleUserSignUp);
router.post('/login', userController.handleUserLogin);

export default router;
