import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({path: '.env'});
console.log(__dirname);

const app = express();
const PORT = process.env.PORT!;
const DB = process.env['DB_URI']!;

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.status(200).json({
        error: null,
        msg: 'Api running'
    });
});

app.listen(PORT, () => {
    console.log(`[SERVER]: Server is running at http://localhost:${PORT}`);
});
console.log(DB, PORT);
// Db connection
mongoose.connect(DB).then(()=> {
    console.log('[SERVER] Database connection success.')
}).catch(e => console.log(`Can't connect to the db`));