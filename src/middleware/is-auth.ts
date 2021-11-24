import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        res.status(401).json({error: 'Not authenticated'});
    }
    const token = authHeader?.split(' ')[1]!;
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesecret');
    } catch (error) {
        res.status(500).json({error: error});
    }
    if(!decodedToken) {
        res.status(401).json({message: 'Not authenticated'});
    }
    req.userId = decodedToken.userId;
    next();
};