const router = require('express').Router();
const contactController = require('../../controllers/contact.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { adminMiddleware } = require('../../middlewares/admin.middleware');

// Public: send message
router.post('/', contactController.createMessage);

// Admin routes
router.get('/admin/all', authMiddleware, adminMiddleware, contactController.adminGetAllMessages);
router.put('/admin/:id/read', authMiddleware, adminMiddleware, contactController.adminMarkAsRead);
router.delete('/admin/:id', authMiddleware, adminMiddleware, contactController.adminDeleteMessage);

module.exports = router;
