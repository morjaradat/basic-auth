const express = require("express");
const bcrypt = require("bcrypt");

const { User } = require("../models/index");
const basicAuth = require("./signInMiddleWare");

const signInRoute = express.Router();

// signInRoute.use("/signin", signInMiddle); doesn't work you can;t pass params

signInRoute.post("/signin", basicAuth, async (req, res) => {
  // let basicHeaderParts = req.headers.authorization.split(" ");
  // let encodedString = basicHeaderParts.pop();
  // let decodedString = base64.decode(encodedString); // "username:password"
  // let [username, password] = decodedString.split(":"); // username, password

  /*
    Now that we finally have username and password, let's see if it's valid
    1. Find the user in the database by username
    2. Compare the plaintext password we now have against the encrypted password in the db
       - bcrypt does this by re-encrypting the plaintext password and comparing THAT
    3. Either we're valid or we throw an error
  */
  console.log(req.params);
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    const valid = await bcrypt.compare(req.params.password, user.password);
    if (valid) {
      res.status(200).json(user);
    } else {
      throw new Error("Invalid User");
    }
  } catch (error) {
    res.status(401).send("Invalid Login");
  }
});

module.exports = signInRoute;
