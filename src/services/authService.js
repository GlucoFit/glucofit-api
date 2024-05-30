const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, Token } = require('../models');

const generateAuthToken = async (user) => {
  const token = jwt.sign(
    { id: user.id, userName: user.userName, email: user.email },
    process.env.JWT_SECRET
  );

  await Token.create({ token, userId: user.id });
  return token;
};

const registerUser = async (userName, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  //Test Log
  // console.log("service:" + userName, email, password + " HASHED PASSWORD " + hashedPassword);
  const newUser = await User.create({ userName, email, password: hashedPassword });
  //Test Log
  // console.log("service, POST CREATE GENERATION:" + userName, email, password + " HASHED PASSWORD " + hashedPassword);
  const token = await generateAuthToken(newUser);
  //Test Log
  // console.log("service, POST TOKEN GENERATION:" + userName, email, password + " HASHED PASSWORD " + hashedPassword);
  return { user: newUser, token };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password.');
  }
  const token = await generateAuthToken(user);
  return { user, token };
};

const logout = async (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    await Token.update({ valid: false }, { where: { token } });
  }
};

const invalidateAllTokens = async (userId) => {
  await Token.update({ valid: false }, { where: { userId } });
};

module.exports = {
  registerUser,
  loginUser,
  generateAuthToken,
  logout,
  invalidateAllTokens,
};