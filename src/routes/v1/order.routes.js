const router = require('express').Router();
const orderController = require('../../controllers/order.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { adminMiddleware } = require('../../middlewares/admin.middleware');

// USER routes
router.post('/', authMiddleware, orderController.createOrder);
router.get('/my-orders', authMiddleware, orderController.getMyOrders);
router.get('/:id', authMiddleware, orderController.getOneOrder);
// GET /orders/filter?status=&dateFrom=&dateTo=
router.get('/filter', authMiddleware, orderController.getOrdersWithFilters);

// ADMIN route to update status
router.put('/:id/status', adminMiddleware, async (req, res) => {
  try {
    const order = await require('../../services/order.service')
      .updateOrderStatus(req.params.id, req.body.status);
    res.json({ ok: true, order });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
});

module.exports = router;
