const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const User = mongoose.model("users");


passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id).then(user=>{
    done(null,user);
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      proxy: true,
    },
    (email, password, done) => {
      User.findOne({ email: email })
        .then((user) => {
          if (!user)
            return done(null, false, { message: "Email does not exist" });
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Invalid Email and Password",
              });
            }
          });
        })
        .catch((err) => console.log(err));
    }
  )
);
