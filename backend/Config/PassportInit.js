const LocalStrategy = require("passport-local");
const UserModel = require("../Models/UsersModel");

const PassportInit = (passport) => {
  // ======> Passport.use
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ username });
        if (!user) return done(null, false);

        if (user.password !== password) return done(null, false);

        done(null, user);
      } catch (error) {
        console.log("Passport Init Use Error: ", error);
        done(error, false);
      }
    })
  );

  // ======> Passport.serializeUser
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // ======> Passport.deserializeUser
  passport.deserializeUser(async (id, done) => {
    try {
      const user = UserModel.findById(id);
      done(null, user);
    } catch (error) {
      console.log("Passport Init deserializeUser Error: ", error);
      done(error, false);
    }
  });
};

module.exports = PassportInit;
