import sqlite from 'better-sqlite3';

const Database = new sqlite('./Database.db');

export default Database;
