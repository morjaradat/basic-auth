const base64 = require("base-64");

const basicAuth = (req, res, next) => {
  console.log("signIn");

  let basicHeaderParts = req.headers.authorization.split(" ");
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString); // "username:password"
  console.log(req.params);
  [username, password] = decodedString.split(":");
  req.params.username = username;
  req.params.password = password;
  console.log(req.params);
  // username, password
  next();
};
module.exports = basicAuth;
