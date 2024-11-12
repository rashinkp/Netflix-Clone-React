const express = require("express");
const cors = require("cors");
const connect = require("./db");
const User = require("./models/users");

const app = express();

app.use(express.json());
app.use(cors());

connect();

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(409).json({message:'User already exists please signin'});
  } else {
  }
  const newUser = new User({ name, email, password });
  await newUser.save();
  res.status(201).json({ message: "signup was successful", res: newUser });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.password === password) {
        return res.status(201).json({ message: "Connected Successfully" });
      } else {
        return res.status(401).json({ message: "Password is not matching" });
      }
    } else {
      return res.status(401).json({ message: "No such user found" });
    }
  } catch (err) {
    console.log("error while sigin", err.message);
    return res.status(500).json({ message: "Connected Successfully" });
  }
});

app.listen(3000, () => {
  console.log("server is on port 3000");
});
