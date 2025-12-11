const mongoose = require('mongoose');

const contactMsgSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    read: { type: Boolean, default: false }, // Admin can mark as read
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactMsg', contactMsgSchema);
