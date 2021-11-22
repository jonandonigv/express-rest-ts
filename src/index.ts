import express from 'express';
import dotenv from 'dotenv';

dotenv.config({path: __dirname + '../.env'});

const app = express();
const PORT = process.env.PORT || 3000;

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
    console.log(`[SERVER]: Server is running at https://localhost:${PORT}`);
});