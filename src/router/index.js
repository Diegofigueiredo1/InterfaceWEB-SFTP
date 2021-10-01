import express from "express"
import { getDir } from "../lib/client.js"
import User from "../models/Users.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/sftp", async (req, res) => {

    const {
        config,
        path
    } = req.body
    let fileList = await getDir(path, config);
    res.json(fileList);
 });

router.get("/", (req, res) => {
    res.redirect("/signin.html");
});

router.post("/signup", async (req, res) => {
    const user = req.body;
  
    const lastID = await User.create(user);
  
    const newUser = await User.read(lastID);
  
    res.status(201).json(newUser);
  });

router.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const { id: userId, password: hash } = await User.readByEmail(email);
  
      const match = await bcrypt.compare(password, hash);
  
      if (match) {
        const token = jwt.sign({ userId }, "secret", { expiresIn: 300 }); // 5min
  
        res.json({ auth: true, token });
      } else {
        throw new Error();
      }
    } catch (error) {
      res.status(401).json({ error: "User not found" });
    }
  }); 


 export { router };