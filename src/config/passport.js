const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authService = require('../services/authService');

//Local Strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await authService.authenticateUser(email, password);
      return done(null, user);
    } catch (error) {
      return done(null, false, { message: error.message });
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await authService.findUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
