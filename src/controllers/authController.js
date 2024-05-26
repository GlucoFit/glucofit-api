const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const newUser = await authService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = (req, res) => {
  res.status(200).json(req.user);
};

exports.googleCallback = (req, res) => {
  res.redirect('/');
};

exports.logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logged out' });
};
