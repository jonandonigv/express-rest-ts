import express, { NextFunction, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import csrf from 'csurf';
import MongoStore from 'connect-mongo';
import multer from 'multer';
import session from 'express-session';

// route imports
import authRoutes from  './routes/auth';
import path from 'path/posix';

dotenv.config({path: '.env'});
console.log(__dirname);

const app = express();
const PORT = process.env.PORT!;
const DB = process.env['DB_URI']!;

const store = new MongoStore({
    mongoUrl: DB,
    collectionName: 'Session'
});
// File management
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

// Express configuration
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(csrf());
app.use(multer({storage: fileStorage, fileFilter: (req, file, cb) => {
    if (
        file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}}).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;
    res.status(status).json({message: message, data: data});
};
app.use(errorHandler);;
// Routes

/* app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    // TODO: Search for user logged in and if the user does not exist throw error
}); */

app.get('/', (req, res) => {
    res.status(200).json({
        error: null,
        msg: 'Api running'
    });
});
app.use('/auth', authRoutes);

// Server initialization
app.listen(PORT, () => {
    console.log(`[SERVER]: Server is running at http://localhost:${PORT}`);
});
// Db connection
mongoose.connect(DB).then(()=> {
    console.log('[SERVER] Database connection success.')
}).catch(e => console.log(`Can't connect to the db`));