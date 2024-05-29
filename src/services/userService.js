const User = require('../models').User;

const createUser = async (userData) => {
  return User.create(userData);
};

const getAllUsers = async () => {
  return User.findAll();
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  return user.update(userData);
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  return user.destroy();
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
