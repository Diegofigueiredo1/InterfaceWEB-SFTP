import express from "express"
import { getDir } from "../lib/client.js"

const router = express.Router();

router.get("/sftp", async (req, res) => {
    const path = req.query.list;
    let fileList = await getDir(path);
    res.json(fileList);
});

// req.body
// routes.get("/sftp", async (req, res) => {
//     const { path } = req.body;
//     let fileList = await getDir(path)
//     res.json(fileList);
// });

export { router };