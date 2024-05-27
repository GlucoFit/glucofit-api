const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.registerUser = async (userData) => {
  const { username, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, email, password: hashedPassword });
  return newUser;
};

exports.authenticateUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Incorrect email.');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect password.');
  }
  return user;
};

exports.findOrCreateGoogleUser = async (profile) => {
  let user = await User.findOne({ where: { googleId: profile.id } });
  if (!user) {
    user = await User.create({
      username: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id,
    });
  }
  return user;
};
