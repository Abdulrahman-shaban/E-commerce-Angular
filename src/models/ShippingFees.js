const mongoose = require('mongoose');

const shippingFeesSchema = new mongoose.Schema(
  {
    country: { type: String, required: true },
    city: { type: String, required: true },
    fee: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ShippingFees', shippingFeesSchema);
