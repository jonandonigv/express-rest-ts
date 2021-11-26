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
    console.log(email, name, password);

    try {
        const hashedPass = await bcrypt.hash(password, 10);
        console.log(hashedPass);

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
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
        const user = await User.findOne({email: email});
        if(!user) {
            res.status(401).json({message: 'A user with this email could not be found'});
        }
        loadedUser = user;
        const isEqual = bcrypt.compare(password, loadedUser?.password!);
        if (!isEqual) {
            res.status(401).json({message: 'Wrong password'});
        }
        const token = jwt.sign({
            email: loadedUser?.email!,
            userId: loadedUser?._id.toString()
        }, 'somesecret',
        {expiresIn: '1h'});
        res.status(200).json({token: token, userId: loadedUser?._id.toString()});
    } catch (error) {
        if (error) {
            res.status(500).json({error: error});
        }
    }
};
