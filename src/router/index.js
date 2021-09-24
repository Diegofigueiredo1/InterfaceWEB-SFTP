import express from "express"
import { getDir } from "../lib/client.js"


const router = express.Router();

router.post("/sftp", async (req, res) => {

    const {
        config,
        path
    } = req.body
    let fileList = await getDir(path, config);
    res.json(fileList);
 });

 export { router };
