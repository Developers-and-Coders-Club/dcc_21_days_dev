import express from 'express';
import taskController from '../controllers/task.js';
import authMiddleware from '../middlewares/auth.js';
const router = express.Router();
router.post(
  '/set',
  authMiddleware.checkForAuthentication,
  authMiddleware.restrictTo(['ADMIN']),
  taskController.handleSetTask
);
router.post(
  '/update',
  authMiddleware.checkForAuthentication,
  authMiddleware.restrictTo(['ADMIN']),
  taskController.handleUpdateTask
);

router.get('/all/:domain', taskController.handleGetAllTask);
router.get('/get/:domain/:dayNo', taskController.handleGetTask);

export default router;
