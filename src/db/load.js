import Seed from "./seeders.js";
import Migration from "./migration.js";

async function load() {
  await Migration.up();
  await Seed.up();
}

load();