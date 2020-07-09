const passport = require("passport");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (router) => {
  /* GET home page. */

  /* fetch data */
  router.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  router.get("/api/logout", (req, res) => {
    req.logout();
    res.send(200);
  });
  /*POST Sign up */
  router.post("/api/signup", (req, res) => {
    const { name, email, password, dob } = req.body;

    //encrypt password then redirect to "/"
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) res.send(400);
        //create new entry for User table
        var newUser = new User({
          email: email,
          password: hash,
          name: name,
          dob: dob,
          role: 0,
          balance: 0,
          games_played: 0,
          wins: 0,
          losses: 0,
        });

        newUser.save();
        res.send(200);
      });
    });
  });

  /*POST Sign up email validation */
  router.post("/api/check_email", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.send(400);
      if (user) return res.send(200);
    });
  });

  /*POST Log in 
router.post(
  "/api/login",

  passport.authenticate("local", {
    successRedirect: "/",
  })
); 

*/
  router.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (e, user, info) => {
      if (e) return res.send(400);
      if (info) return res.send(info);
      req.logIn(user, (e) => {
        if (e) return next(e);
        return res.send(user);
      });
    })(req, res, next);
  });

  router.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/",
      failureRedirect: "/",
    })
  );
};
