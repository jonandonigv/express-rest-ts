import { Request, Response, NextFunction } from "express";

export const postSignIn = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({msg: 'Success'});
};

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({msg: 'Success'});
};

export const postLogOff = async (req: Request, res: Response, next: NextFunction) => {}