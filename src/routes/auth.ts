import { NextFunction, Router } from "express";
import * as authController from '../controllers/auth';
const router = Router();

router.post('/signup', authController.postSignIn);
router.post('/Login', authController.postLogin);

export default router;