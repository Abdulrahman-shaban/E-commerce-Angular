const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret, expiresIn } = require('../config/jwt');

const signToken = (user) => jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn });

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email in use' });
  const user = await User.create({ name, email, password });
  const token = signToken(user);
  res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
};
 
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
  const token = signToken(user);
  res.json({ user: { id: user._id, name: user.name, email: user.email }, token });
};

exports.me = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ user });
};
