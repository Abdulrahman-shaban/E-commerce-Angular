const router = require('express').Router();
const testimonialController = require('../../controllers/testimonial.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { adminMiddleware } = require('../../middlewares/admin.middleware');

// Public
router.post('/', testimonialController.createTestimonial);
router.get('/', testimonialController.getTestimonials);

// Admin
router.get('/admin/all', authMiddleware, adminMiddleware, testimonialController.adminGetAllTestimonials);
router.put('/admin/:id/approve', authMiddleware, adminMiddleware, testimonialController.adminApproveTestimonial);
router.delete('/admin/:id', authMiddleware, adminMiddleware, testimonialController.adminDeleteTestimonial);

module.exports = router;
