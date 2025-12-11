const orderService = require('../services/order.service');

exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.user.id, req.body);
    res.json({ ok: true, order });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await orderService.getUserOrders(req.user.id);
    res.json({ ok: true, orders });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.json({ ok: true, order });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await orderService.updateOrderStatus(id, status);
    res.json({ ok: true, order });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// Admin: Filters + Pagination + Sorting
exports.getOrdersWithFilters = async (req, res) => {
  try {
    const {
      status,
      dateFrom,
      dateTo,
      page,
      limit,
      sortBy,
      order
    } = req.query;

    const result = await orderService.getOrdersWithFilters({
      status,
      dateFrom,
      dateTo,
      page,
      limit,
      sortBy,
      order
    });

    res.json({ ok: true, ...result });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await orderService.deleteOrder(req.params.id);
    res.json({ ok: true, order });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};
