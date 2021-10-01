import bcrypt from "bcrypt";

import Database from "../db/index.js";

async function load(user) {
  const db = await Database.connect();

  const { id, name, email, password } = user;

  const sql = `
    INSERT INTO
      users (id, name, email, password)
    VALUES
      (?, ?, ?, ?)
  `;

  const hash = await bcrypt.hash(password, 10);

  const { lastID } = await db.run(sql, [id, name, email, hash]);

  db.close();

  return lastID;
}

async function create(user) {
  const db = await Database.connect();

  const { name, email, password } = user;

  const sql = `
    INSERT INTO
      users (name, email, password)
    VALUES
      (?, ?, ?)
  `;

  const hash = await bcrypt.hash(password, 10);

  const { lastID } = await db.run(sql, [name, email, hash]);

  db.close();

  return lastID;
}

async function read(id) {
  const db = await Database.connect();

  const sql = `
    SELECT 
      *
    FROM
      users
    WHERE
      id = ?
  `;

  const user = await db.get(sql, [id]);

  db.close();

  return user;
}

async function readByEmail(email) {
  const db = await Database.connect();

  const sql = `
    SELECT 
      *
    FROM
      users
    WHERE
      email = ?
  `;

  const user = await db.get(sql, [email]);

  db.close();

  return user;
}

export default { load, create, read, readByEmail };