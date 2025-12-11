// /server/src/models/Category.js
const mongoose = require('mongoose');
const slugifyText = require('../utils/slugify');

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null }, // null for parent categories
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }, // soft delete
  },
  { timestamps: true }
);

// Generate slug before saving
CategorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugifyText(this.name);
  }
  next();
});

module.exports = mongoose.model('Category', CategorySchema);
