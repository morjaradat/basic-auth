const express = require("express");
const { User } = require("../models/index");
const signUpRoute = express.Router();
const signUpMiddle = require("../auth/signUpMiddleWare");

signUpRoute.post("/signup", signUpMiddle, async (req, res) => {
  try {
    const record = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.status(201).json(record);
  } catch (e) {
    res.status(403).send("Error Creating User");
  }
});

module.exports = signUpRoute;
