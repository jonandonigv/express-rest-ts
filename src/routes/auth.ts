import { Router } from "express";
import {body} from 'express-validator';

import * as authController from '../controllers/auth';
const router = Router();

router.post('/signup', authController.SingUp);
// router.post('/Login', authController.postLogin);

export default router;