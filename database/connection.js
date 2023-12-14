import sqlite from 'better-sqlite3';
import dotenv from 'dotenv';
dotenv.config();
// import backup from './backup.js';

// backup.fetchBackupFromNextcloud();

const Database = new sqlite('./' + process.env.DB_FILENAME);

export default Database;
