import path from 'path';
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import multer from 'multer';

// route imports
import authRoutes from  './routes/auth';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';


dotenv.config({path: '.env'});
const PORT = process.env.PORT!;
const DB = process.env['DB_URI']!;

const app = express();
const store = new MongoStore({
    mongoUrl: DB,
    collectionName: 'Session'
});
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({message: message, data: data});
};

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

app.use(express.json());
app.use(multer({
    storage: fileStorage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'image/png' || 
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
}).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
// In theory in RESTapis you don't have sessions because all the session like things happen in the client.
/* app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
})); */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);




app.use(errorHandler);

// Server initialization
app.listen(PORT, () => {
    console.log(`[SERVER]: Server is running at http://localhost:${PORT}`);
});
// Db connection
mongoose.connect(DB).then(()=> {
    console.log('[SERVER]: Database connection success.')
}).catch(e => console.log(`Can't connect to the db`));