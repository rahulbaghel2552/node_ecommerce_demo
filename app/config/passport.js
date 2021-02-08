const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

function init(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        // login

        // check email exist
        const user = await User.findOne({ email: email });
        console.log("email is " + user);

        if (!user) {
          return done(null, false, { message: "no user email id is exist" });
        } else {
          bcrypt
            .compare(password, user.password)
            .then((match) => {
              if (match) {
                return done(null, user, { message: "login in sucessfully" });
              }
              return done(null, false, { message: "wrong username or password" });
            })
            .catch((err) => {
              return done(null, false, { message: "something went wrong" });
            });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = init;
