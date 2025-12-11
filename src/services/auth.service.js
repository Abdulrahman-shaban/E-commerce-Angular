// /server/src/services/auth.service.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (data) => {
  const { name, email, password, mobile } = data;

  const exists = await User.findOne({ email });
  if (exists) throw new Error('Email already registered.');

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    mobile,
    password: hashed,
    role: 'client',
  });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

  return { user, token };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('Invalid credentials.');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials.');

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

  return { user, token };
};
