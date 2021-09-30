import express from "express"
import { getDir } from "../lib/client.js"
import User from "../models/User.js";

const router = express.Router();


router.get("/", (req, res) => {
    res.redirect("signup.html");
});

router.post("/sftp", async (req, res) => {

    const {
        config,
        path
    } = req.body
    let fileList = await getDir(path, config);
    res.json(fileList);
});




router.post("/signup", async (req, res) => {
    const user = req.body;

    const lastID = await User.create(user);

    const newUser = await User.read(lastID);

    res.status(201).json(newUser);
});

export { router };
