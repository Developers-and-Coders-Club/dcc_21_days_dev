import sqlite from "better-sqlite3";

const Database = new sqlite("./HitMap.db", { verbose: console.log });

export default Database