const bcrypt = require("bcrypt");

const signUpMiddle = async (req, res, next) => {
  console.log("/signup middle");
  req.body.password = await bcrypt.hash(req.body.password, 10);
  next();
};
module.exports = signUpMiddle;
