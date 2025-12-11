// server/src/controllers/cart.controller.js
const cartService = require('../services/cart.service');

exports.getCart = async (req, res) => {
  try {
    const cart = await cartService.getUserCart(req.user.id);
    res.json({ ok: true, cart });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const payload = req.body; // { productId, quantity, size, color }
    const cart = await cartService.addToCart(req.user.id, payload);
    res.json({ ok: true, cart });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const cart = await cartService.updateItemQuantity(req.user.id, itemId, quantity);
    res.json({ ok: true, cart });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await cartService.removeItem(req.user.id, itemId);
    res.json({ ok: true, cart });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const cart = await cartService.clearCart(req.user.id);
    res.json({ ok: true, cart });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};
