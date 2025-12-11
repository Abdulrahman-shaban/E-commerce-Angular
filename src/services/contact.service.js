const ContactMsg = require('../models/ContactMsg');

class ContactService {
  async createMessage(data) {
    return await ContactMsg.create(data);
  }

  async adminGetAllMessages() {
    return await ContactMsg.find().sort({ createdAt: -1 });
  }

  async adminMarkAsRead(id) {
    const msg = await ContactMsg.findById(id);
    if (!msg) throw new Error('Message not found');
    msg.read = true;
    await msg.save();
    return msg;
  }

  async adminDeleteMessage(id) {
    const msg = await ContactMsg.findByIdAndDelete(id);
    if (!msg) throw new Error('Message not found');
    return msg;
  }
}

module.exports = new ContactService();
