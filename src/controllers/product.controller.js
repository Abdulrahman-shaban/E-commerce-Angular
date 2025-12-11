// /server/src/controllers/product.controller.js
const productService = require('../services/product.service');

exports.createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts(req.query);
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

exports.softDeleteProduct = async (req, res, next) => {
  try {
    const product = await productService.softDeleteProduct(req.params.id);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

exports.toggleActive = async (req, res, next) => {
  try {
    const product = await productService.toggleActive(req.params.id);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};
exports.getProductsWithFilters = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    const products = await productService.getProductsWithFilters({ category, minPrice, maxPrice, search });
    res.json({ ok: true, products });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};
exports.getProductsWithFilters = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, page, limit, sortBy, order } = req.query;
    const result = await productService.getProductsWithFilters({ category, minPrice, maxPrice, search, page, limit, sortBy, order });
    res.json({ ok: true, ...result });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

