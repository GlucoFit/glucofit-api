exports.login = (req, res) => {
    res.status(200).json(req.user);
  };
  
  exports.logout = (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logged out' });
  };
  