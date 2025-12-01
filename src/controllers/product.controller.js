const Product = require('../models/Product');

exports.list = async (req, res) => {
  const products = await Product.find().limit(50).populate('category');
  res.json({ products });
};

exports.get = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category');
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ product });
};

exports.create = async (req, res) => {
  const body = req.body;
  const product = await Product.create(body);
  res.status(201).json({ product });
};

exports.update = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ product });
};

exports.remove = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
};
