const express = require('express');
const router = express.Router();
const orderRoutes = require('./v1/order.routes');
const testimonialRoutes = require('./v1/testimonial.routes');
const contactRoutes = require('./v1/contact.routes');
const shippingRoutes = require('./v1/shipping.routes');
const adminRoutes = require('./v1/admin.routes');


// Load all routes WITHOUT adding /v1 again
router.use(require('./v1/auth.routes'));
router.use(require('./v1/product.routes'));
router.use(require('./v1/category.routes'));
router.use(require('./v1/order.routes'));
router.use(require('./v1/testimonial.routes'));
router.use(require('./v1/contact.routes'));
router.use(require('./v1/cart.routes'));
router.use(require('./v1/admin.routes'));
router.use('/v1/cart', require('./v1/cart.routes'));
router.use('/orders', orderRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/contacts', contactRoutes);
router.use('/shipping-fees', shippingRoutes);
router.use('/admin', adminRoutes);



module.exports = router;
    