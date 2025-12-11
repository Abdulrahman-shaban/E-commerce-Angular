// /server/src/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },

    description: { type: String, required: true },

    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },

    images: { type: [String], default: [] },

    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },

    isActive: { type: Boolean, default: true },

    isDeleted: { type: Boolean, default: false }, // Soft delete
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
