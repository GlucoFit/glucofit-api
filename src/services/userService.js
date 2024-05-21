const User = require('../models/User');

// Service to create a new user
const createUser = async (userData) => {
  const newUser = await User.create(userData);
  return newUser;
};

// Service to get all users
const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

// Service to get user by ID
const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

// Service to update user by ID
const updateUser = async (id, updateData) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  await user.update(updateData);
  return user;
};

// Service to delete user by ID
const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  await user.destroy();
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
