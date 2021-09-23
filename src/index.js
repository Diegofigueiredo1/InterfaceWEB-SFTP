import express from "express";
// import nunjucks from "nunjucks";
import cors from "cors";
import morgan from "morgan";
import { router } from "./router/index.js"

const app = express();

app.use(express.json());
// app.use(express.static('public'));

app.use(cors());

app.use(morgan());

app.use(router);

// app.set('view engine', 'njk');

// nunjucks.configure('src/views', {
//   express: app,
//   autoescape: true,
//   noCache: true,
// });

// Seed.up()
app.listen(3000, () => console.log("Server running"));

