const router = require('express').Router();
const shippingController = require('../../controllers/shipping.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { adminMiddleware } = require('../../middlewares/admin.middleware');

// Public: get shipping fee by location
router.get('/', shippingController.getFeeByLocation);

// Admin routes
router.post('/', authMiddleware, adminMiddleware, shippingController.createFee);
router.get('/admin/all', authMiddleware, adminMiddleware, shippingController.getAllFees);
router.put('/admin/:id', authMiddleware, adminMiddleware, shippingController.updateFee);
router.delete('/admin/:id', authMiddleware, adminMiddleware, shippingController.deleteFee);

module.exports = router;
