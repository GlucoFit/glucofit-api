const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models').User;

const generateAuthToken = (user) => {
  return jwt.sign(
    { id: user.id, userName: user.userName, email: user.email },
    process.env.JWT_SECRET
  );
};

const registerUser = async (userName, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ userName, email, password: hashedPassword });
  const token = generateAuthToken(newUser);
  return { user: newUser, token };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password.');
  }
  const token = generateAuthToken(user);
  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
  generateAuthToken,
};
