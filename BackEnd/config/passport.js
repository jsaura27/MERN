const localStrategy = require("passport-local").Strategy;

//Local User model
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    "register",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done, info) => {
        try {
          let user = await User.findOne({ email: email });
          if (user) {
            return done(null, false, { message: "user already exist" });
            // return done(null, false);
          }
          let newUser = new User();

          newUser.name = req.body.name;
          newUser.email = email;
          newUser.password = password;

          user = await newUser.save();
          return done(null, user);
        } catch (error) {
          console.log(error);
          // return done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email: email });

          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          const validate = await user.matchPassword(password);

          if (!validate) {
            return done(null, false, { message: "Wrong Password" });
          }
          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
