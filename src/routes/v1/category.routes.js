// /server/src/routes/v1/category.routes.js
const express = require('express');
const router = express.Router();

const categoryController = require('../../controllers/category.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { adminMiddleware } = require('../../middlewares/admin.middleware');

// Public
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);

// Admin
router.post('/', authMiddleware, adminMiddleware, categoryController.createCategory);
router.put('/:id', authMiddleware, adminMiddleware, categoryController.updateCategory);
router.delete('/:id', authMiddleware, adminMiddleware, categoryController.softDeleteCategory);
router.patch('/:id/toggle', authMiddleware, adminMiddleware, categoryController.toggleActive);

module.exports = router;
