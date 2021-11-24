import { Router } from "express";
import {body} from 'express-validator';

import * as authController from '../controllers/auth';
import { User } from "../models/user";
const router = Router();
router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, {req})=> {
            return User.findOne({email: value}).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Email address already exist');
                }
            });
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 6}),
    body('name')
        .trim()
        .not()
        .isEmpty()
], authController.SingUp);

router.post('/login', authController.Login);

export default router;