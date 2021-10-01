import path from "path";
import fs from "fs";
import User from "../models/Users.js";

const __dirname = new URL(".", import.meta.url).pathname;

function up() {
  const filename = path.join(__dirname, "seeders.json");

  const content = fs.readFileSync(filename);

  const seeders = JSON.parse(content);

  for (const user of seeders.users) {
    User.load(user);
  }
}

export default { up };