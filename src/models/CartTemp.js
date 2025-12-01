const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number
});

const CartTempSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [CartItemSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CartTemp', CartTempSchema);
