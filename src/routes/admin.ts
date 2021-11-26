import { Router } from "express";
import {body} from 'express-validator';

import * as adminController from '../controllers/admin';
import { User } from "../models/user";
const router = Router();

router.put('/createProduct', adminController.createProduct);

export default router;