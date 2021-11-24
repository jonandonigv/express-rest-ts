import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";

import {User} from '../models/user';


export const SingUp = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors) {
        const error = new Error('Validation failed');
        res.status(422).json({error: error});
        next(error);
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    try {
        const hashedPass = await bcrypt.hash(password, 10);

        const user = new User({
            email: email,
            name: name,
            password: hashedPass
        });
        const result = await user.save();
        res.status(201).json({message: 'User created', userId: result._id});
    } catch (err) {
        res.status(500).json({error: err});
        next(err);
    }
    
};

export const Login = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({msg: 'Success'});
};

export const LogOff = async (req: Request, res: Response, next: NextFunction) => {}