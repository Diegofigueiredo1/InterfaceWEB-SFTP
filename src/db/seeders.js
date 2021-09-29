import path from "path";
import fs from "fs";
import Host from "../models/Host.js";
import User from "../models/User.js";

const __dirname = new URL(".", import.meta.url).pathname;

function up() {
  const filename = path.join(__dirname, "seeders.json");

  const content = fs.readFileSync(filename);

  const seeders = JSON.parse(content);

  for (const host of seeders.hosts) {
    Host.load(host);
  }

  for (const user of seeders.users) {
    User.load(user);
  }
}

export default { up };
