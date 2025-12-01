// a lightweight service layer example
const User = require('../models/User');

exports.createUser = async (payload) => {
  return User.create(payload);
};

exports.findByEmail = async (email) => {
  return User.findOne({ email });
};
