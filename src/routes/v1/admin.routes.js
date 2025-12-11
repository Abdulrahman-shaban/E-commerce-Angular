const router = require('express').Router();
const adminController = require('../../controllers/admin.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { adminMiddleware } = require('../../middlewares/admin.middleware');

// USER MANAGEMENT
router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);
router.get('/users/:id', authMiddleware, adminMiddleware, adminController.getUserById);
router.put('/users/:id/role', authMiddleware, adminMiddleware, adminController.updateUserRole);
router.delete('/users/:id', authMiddleware, adminMiddleware, adminController.deleteUser);

// DASHBOARD
router.get('/dashboard', authMiddleware, adminMiddleware, adminController.getDashboardStats);

module.exports = router;
