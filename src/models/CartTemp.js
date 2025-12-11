// server/src/models/CartTemp.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { type: Number, default: 1, min: 1 },
  size: { type: String },
  color: { type: String },
  price: { type: Number, required: true } // snapshot of product price when added
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema],
    totalPrice: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
