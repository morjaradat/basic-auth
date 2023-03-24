const express = require("express");
const base64 = require("base-64");
const signInRoute = require("./auth/signIn.route");
const signUpRoute = require("./auth/signUp.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(signUpRoute);
app.use(signInRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

function start(port) {
  app.listen(port, () =>
    console.log(
      `------------APT SERVER listening on port ${port}!---------------`
    )
  );
}

module.exports = {
  app: app,
  start: start,
};
