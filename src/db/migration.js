import Database from "./index.js";

async function up() {
  const db = await Database.connect();

  await db.run(`
    CREATE TABLE IF NOT EXISTS hosts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS times (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      time REAL NOT NULL,
      create_at NUMERIC NOT NULL DEFAULT CURRENT_TIMESTAMP,
      host_id INTEGER NOT NULL REFERENCES hosts (id)
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
}

export default { up };
