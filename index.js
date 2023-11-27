import express from 'express';
import sqlite from 'better-sqlite3';
import axios from 'axios';
import cron from 'node-cron';
import createTables from './db/createTable.js';
import userRouter from './routes/user.js'

const app = express();

// -------Middlewares-------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 3000;

// Connect DB 
createTables();

// -------Routes--------
app.get('/ping', (_, res) => {
    res.status(200).json('pong');
})
app.use('/user', userRouter);

app.listen(PORT, () => {console.log(`Server started at PORT ${PORT}`)});