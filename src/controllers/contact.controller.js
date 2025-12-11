const contactService = require('../services/contact.service');

// Public: create a contact message
exports.createMessage = async (req, res) => {
  try {
    const message = await contactService.createMessage(req.body);
    res.json({ ok: true, message });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// Admin: get all messages
exports.adminGetAllMessages = async (req, res) => {
  try {
    const messages = await contactService.adminGetAllMessages();
    res.json({ ok: true, messages });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// Admin: mark as read
exports.adminMarkAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await contactService.adminMarkAsRead(id);
    res.json({ ok: true, message });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// Admin: delete message
exports.adminDeleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await contactService.adminDeleteMessage(id);
    res.json({ ok: true, message });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};
