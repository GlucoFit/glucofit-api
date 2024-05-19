const { auth } = require('../config/firebaseConfig');
const admin = require('firebase-admin');

const registerUser = async (email, password) => {
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    return userRecord;
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (email, password) => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    // Validate password here (e.g., by using a hashed password stored in your database)
    return userRecord;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { registerUser, loginUser };
