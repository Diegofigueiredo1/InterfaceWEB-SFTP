import fs from "fs";
import path from "path";
import Database from "sqlite-async";

import Seed from "./seeders.js";
import Migration from "./migration.js";

const databaseFile = path.resolve("src", "db", "database.sqlite");

async function connect() {
  return await Database.open(databaseFile);
}

async function load() {
  if (!fs.existsSync(databaseFile)) {
    Migration.up();
    Seed.up();
  }
}

export default { connect, load };