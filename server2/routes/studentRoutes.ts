// studentRoutes.ts
import express from 'express';
import studentController from '../controllers/studentController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware.verifyToken);

router.get('/viewProfile', studentController.viewProfile);

export default router;
