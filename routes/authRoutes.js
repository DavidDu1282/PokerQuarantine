const passport = require("passport");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const express = require("express");
var router = express.Router();

// @TODO: cope with async/await

/* fetch data */
router.get("/current_user", (req, res) => {
  res.send(req.user);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});
/*POST Sign up */
router.post("/signup", (req, res) => {
  const { name, email, password, dob } = req.body;

  //encrypt password then redirect to "/"
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) res.send(400);
      //create new entry for User table
      var newUser = new User({
        name: name,
        email: email,
        password: hash,

        dob: dob,
        role: 0,
        balance: 0,
        games_played: 0,
        wins: 0,
        losses: 0,
      });

      newUser.save();

      res.sendStatus(200);
    });
  });
});

/*POST Sign up email validation */
router.post("/check_email", async (req, res) => {
  await User.findOne({ email: req.body.email }).exec((err, user) => {
    // to @vincent: I reverted the 400 and 200 to make is easier on the frontend since 400 triggers an err, also modified ur mongo code to cope with async/await
    if (user) return res.sendStatus(400);
    else return res.sendStatus(200);
  });
});

//Sign up username validation
router.post("/check_email", async (req, res) => {
  await User.findOne({ username: req.body.username }).exec((err, user) => {
    if (user) return res.sendStatus(400);
    else return res.sendStatus(200);
  });
});

//Change password
router.post("/change_password", (req, res) => {
  const { currPassword, newPassword } = req.body;

  User.findOne({ _id: req.user._id }).then((user) => {
    if (!user) return res.sendStatus(400);
    bcrypt.compare(currPassword, user.password, (err, isMatch) => {
      if (err) return res.sendStatus(400);
      if (isMatch) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) res.send(400);
            User.findByIdAndUpdate(
              { _id: req.user._id },
              { password: hash },
              (err, result) => {
                if (err) return res.sendStatus(400);
                else return res.sendStatus(200);
              }
            );
          });
        });
      }
    });
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
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (e, user, info) => {
    if (e) return res.sendStatus(400);
    if (!user) return res.sendStatus(400);
    if (info) return res.send(info);
    req.logIn(user, (e) => {
      if (e) return res.sendStatus(400);
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

module.exports = router;
