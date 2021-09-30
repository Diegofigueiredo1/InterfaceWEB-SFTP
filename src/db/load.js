// import Seed from "./seeders.js";
import Migration from "./migrations.js";

async function load() {
    await Migration.up();
    //   await Seed.up();
}

load();
