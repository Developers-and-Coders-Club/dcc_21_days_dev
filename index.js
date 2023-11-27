import express from 'express';
import sqlite from 'better-sqlite3';
import axios from 'axios';
import cron from 'node-cron';
import createTable from './db/connection.js';
import dbOperations from './db/dbOperations.js'

const app = express();

// -------Middlewares-------------
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Connect DB and Create HitMap Table
createTable();

// -------Routes--------
app.get('/ping', (_, res) => {
    res.status(200).json('pong');
})


app.listen(PORT, () => {console.log(`Server started at PORT ${PORT}`)});