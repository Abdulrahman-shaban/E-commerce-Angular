const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    approved: { type: Boolean, default: false }, // Admin can approve
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
