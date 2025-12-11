// server/src/routes/v1/cart.routes.js
const router = require('express').Router();
const cartController = require('../../controllers/cart.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');

// GET user cart
router.get('/', authMiddleware, cartController.getCart);

// POST add item { productId, quantity, size, color }
router.post('/add', authMiddleware, cartController.addToCart);

// PUT update quantity { quantity }
router.put('/item/:itemId/quantity', authMiddleware, cartController.updateQuantity);

// DELETE remove single item
router.delete('/item/:itemId', authMiddleware, cartController.removeItem);

// DELETE clear cart
router.delete('/clear', authMiddleware, cartController.clearCart);

module.exports = router;
