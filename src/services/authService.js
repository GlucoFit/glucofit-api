const bcrypt = require('bcryptjs');
const User = require('../models/User');

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

exports.findUserById = async (id) => {
  return await User.findByPk(id);
};
