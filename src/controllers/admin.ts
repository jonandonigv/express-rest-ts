import path from 'path';

import express, { Request, Response, NextFunction } from 'express';

import { Product } from '../models/product';
import { validationResult } from 'express-validator';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({error: errors, message: 'Validation failed, entered data is incorrect'});
    }
    if (!req.file) {
        res.status(422).json({error: true, message: 'Not image provided'});
    }
        
    const name = req.body.name;
    const image = req.file;
    const price = req.body.prize
    const description = req.body.description;
    const product = new Product({
        name: name,
        imageUrl: image,
        price: price,
        description: description,
    });
    try {
        await product.save();
    } catch (error) {
        
    }
};
