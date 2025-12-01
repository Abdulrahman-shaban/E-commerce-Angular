const express = require('express');
const router = express.Router();

// Load all routes WITHOUT adding /v1 again
router.use(require('./v1/auth.routes'));
router.use(require('./v1/product.routes'));
router.use(require('./v1/category.routes'));
router.use(require('./v1/order.routes'));
router.use(require('./v1/testimonial.routes'));
router.use(require('./v1/contact.routes'));
router.use(require('./v1/cart.routes'));
router.use(require('./v1/admin.routes'));

module.exports = router;
    