// adminRoutes.ts
import express from 'express';
import adminController from '../controllers/adminController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware.verifyToken);

router.post('/createUser', adminController.createUser);
router.post('/assignRole', adminController.assignRole);

export default router;
