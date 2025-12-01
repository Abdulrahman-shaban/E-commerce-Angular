const mongoose = require('mongoose');

const ShippingFeesSchema = new mongoose.Schema({
  region: String,
  fee: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ShippingFees', ShippingFeesSchema);
