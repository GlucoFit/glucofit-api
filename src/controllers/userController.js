const userService = require('../services/userService');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.getUserMe(userId);
    if (!user){
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUsername = async (req, res) => {
  try {
    const userId = req.user.id;
    const { userName } = req.body;
    const updatedUser = await userService.updateUsername(userId, userName);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email } = req.body;
    const updatedUser = await userService.updateEmail(userId, email);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await userService.updatePassword(userId, hashedPassword);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUserMe = async (req, res) => {
  try {
    const userId = req.user.id;
    await userService.deleteUserMe(userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await userService.getAllUsers();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getUserById = async (req, res) => {
//   try {
//     const user = await userService.getUserById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const updatedUser = await userService.updateUser(req.params.id, req.body);
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     await userService.deleteUser(req.params.id);
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
