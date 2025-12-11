const shippingService = require('../services/shipping.service');

// Admin: create shipping fee
exports.createFee = async (req, res) => {
  try {
    const fee = await shippingService.createFee(req.body);
    res.json({ ok: true, fee });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// Admin: get all shipping fees
exports.getAllFees = async (req, res) => {
  try {
    const fees = await shippingService.getAllFees();
    res.json({ ok: true, fees });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// Admin: update fee
exports.updateFee = async (req, res) => {
  try {
    const { id } = req.params;
    const fee = await shippingService.updateFee(id, req.body);
    res.json({ ok: true, fee });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// Admin: delete fee
exports.deleteFee = async (req, res) => {
  try {
    const { id } = req.params;
    const fee = await shippingService.deleteFee(id);
    res.json({ ok: true, fee });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// Public: get fee by location
exports.getFeeByLocation = async (req, res) => {
  try {
    const { country, city } = req.query;
    const fee = await shippingService.getFeeByLocation(country, city);
    res.json({ ok: true, fee });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};
