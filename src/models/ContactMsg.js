const mongoose = require('mongoose');

const ContactMsgSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ContactMsg', ContactMsgSchema);
