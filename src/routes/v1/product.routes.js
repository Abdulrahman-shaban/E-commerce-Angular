const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product.controller');

router.get('/products', productController.list);
router.get('/products/:id', productController.get);
router.post('/products', productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.remove);

module.exports = router;
