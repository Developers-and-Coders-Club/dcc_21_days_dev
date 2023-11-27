import express from 'express';
import sqlite from 'better-sqlite3';
import axios from 'axios';
import cron from 'node-cron';
import dbOperations from './db/db.js'

const app = express();
// -------Middlewares-------------
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Create HitMap Table
dbOperations.createTable();

// -------Routes--------
app.get('/ping', (_, res) => {
    res.status(200).json('pong');
})


app.listen(PORT, () => {console.log(`Server started at PORT ${PORT}`)});