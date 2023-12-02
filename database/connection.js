import sqlite from "better-sqlite3";

const Database = new sqlite("./Database.db", { verbose: console.log });

export default Database