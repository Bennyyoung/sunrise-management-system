// teacherRoutes.ts
import express from 'express';
import teacherController from '../controllers/teacherController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware.verifyToken);

router.get('/viewStudents', teacherController.viewStudents);

export default router;
