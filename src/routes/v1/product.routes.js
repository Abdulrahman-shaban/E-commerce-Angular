// /server/src/routes/v1/product.routes.js
const express = require('express');
const router = express.Router();

const productController = require('../../controllers/product.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { adminMiddleware } = require('../../middlewares/admin.middleware');

// Public
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Admin
router.post('/', authMiddleware, adminMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productController.softDeleteProduct);
router.patch('/:id/toggle', authMiddleware, adminMiddleware, productController.toggleActive);
// GET /products/filter?category=&minPrice=&maxPrice=&search=
router.get('/filter', productController.getProductsWithFilters);

module.exports = router;
