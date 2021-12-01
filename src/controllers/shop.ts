import { Request, Response, NextFunction } from "express";

import { Product } from "../models/product";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    try {
        const totalItems = await Product.find().countDocuments();
        const product = await Product.find()
            .populate('name');
        res.status(200).json({
            message: 'Fetched products successfully',
            product: product,
            totalItems: totalItems
        });
    } catch (error) {
        res.status(500).json({error: error});
        next(error);
    }
};