import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./router/index.js";
import Database from "./db/index.js"

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.use(cors());

app.use(morgan());

app.use(router);

Database.load();

app.listen(3000, () => console.log("Server running"));

