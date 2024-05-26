const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.createUser = async (userData) => {
  const { username, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, email, password: hashedPassword });
  return newUser;
};

exports.getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

exports.getUserById = async (userId) => {
  const user = await User.findByPk(userId);
  return user;
};

exports.updateUser = async (userId, updateData) => {
  const [updated] = await User.update(updateData, { where: { id: userId } });
  if (updated) {
    const updatedUser = await User.findByPk(userId);
    return updatedUser;
  }
  throw new Error('User not found');
};

exports.deleteUser = async (userId) => {
  const deleted = await User.destroy({ where: { id: userId } });
  if (deleted) {
    return 'User deleted';
  }
  throw new Error('User not found');
};
