const {User, Assessment} = require('../models');
const authService = require('./authService');
// const createUser = async (userData) => {
//   return User.create(userData);
// };

const getUserMe = async (userId) => {
  return User.findByPk(userId);
};

const updateUsername = async (userId, newUsername) => {
  const user = await User.findByPk(userId);
  if (user.googleId) throw new Error('User is authenticated with google, cannot update data');
  if (!user) throw new Error('User not found');
  user.userName = newUsername;
  return user.save();
};

const updateEmail = async (userId, newEmail) => {
  const user = await User.findByPk(userId);
  if (user.googleId) throw new Error('User is authenticated with google, cannot update data');
  if (!user) throw new Error('User not found');
  user.email = newEmail;
  return user.save();
};

const updatePassword = async (userId, newPassword) => {
  const user = await User.findByPk(userId);
  if (user.googleId) throw new Error('User is authenticated with google, cannot update data');
  if (!user) throw new Error('User not found');
  user.password = newPassword;
  return user.save();
};

const deleteUserMe = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');
  await authService.invalidateAllTokens(userId);
  return user.destroy();
};

// const getAllUsers = async () => {
//   return User.findAll();
// };

// const getUserById = async (id) => {
//   return User.findByPk(id);
// };

// const updateUser = async (id, userData) => {
//   const user = await User.findByPk(id);
//   if (!user) throw new Error('User not found');
//   return user.update(userData);
// };

// const deleteUser = async (id) => {
//   const user = await User.findByPk(id);
//   if (!user) throw new Error('User not found');
//   return user.destroy();
// };

module.exports = {
  // createUser,
  // createUser,
  getUserMe,
  updateUsername,
  updateEmail,
  updatePassword,
  deleteUserMe,
  // getAllUsers,
  // getUserById,
  // updateUser,
  // deleteUser,
};
