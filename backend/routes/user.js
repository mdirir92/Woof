const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

//simple route to register a user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  console.log(name, email, password);

  //checking if the user already exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Signing up failed, please try again later" });
  }

  if (existingUser) {
    return res
      .status(422)
      .json({ message: "User already exists, please login instead" });
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Signing up failed, please try again later" });
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await createdUser.save();
    res.json(createdUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Signing up failed, please try again later" });
  }
});

//simple route to login user and return the user
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed, please try again later" });
  }
});

module.exports = router;
