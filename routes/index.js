var express = require("express");
var router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile("index.html");
});

/*POST Sign up */

router.post("/api/signup", (req, res) => {
  const { name, email, password, dob } = req.body;
  //encrypt password
  var encryptPwd = bcrypt.hash(password, 5);
  //create new entry for User table
  var newUser = new User({
    email: email,
    password: encryptPwd,
    name: name,
    dob: dob,
  });
  newUser.save();
  res.redirect("/");
});

/*POST Log in */
router.post(
  "/api/login",
  passport.authenticate("local", {
    successRedirect: "/",
  })
);
module.exports = router;
