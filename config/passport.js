// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('../src/models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false // Ensure session is set to false
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

const callbackURL =
  process.env.NODE_ENV === 'production'
    ? 'https://glucofit-api-l76ziq6bya-et.a.run.app/api/auth/google/callback'
    : process.env.NODE_ENV === 'test'
    ? 'http://195.35.6.208:8080/api/auth/google/callback'
    : 'http://localhost:8080/api/auth/google/callback';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: callbackURL,
  session: false // Ensure session is set to false
}, async (token, tokenSecret, profile, done) => {
  try {
    let user = await User.findOne({ where: { googleId: profile.id } });
    if (!user) {
      user = await User.create({ 
        googleId: profile.id,
        userName: profile.displayName,
        email: profile.emails[0].value 
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

module.exports = passport;
