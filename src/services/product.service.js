// /server/src/services/product.service.js
const Product = require('../models/Product');
const slugifyText = require('../utils/slugify');

exports.createProduct = async (data) => {
  const slug = slugifyText(data.name);

  const product = await Product.create({
    ...data,
    slug,
  });

  return product.populate('category').populate('subcategory');
};

exports.getProducts = async (query) => {
  const filter = { isDeleted: false };

  if (query.category) filter.category = query.category;
  if (query.subcategory) filter.subcategory = query.subcategory;

  if (query.minPrice || query.maxPrice) {
    filter.price = {
      ...(query.minPrice && { $gte: Number(query.minPrice) }),
      ...(query.maxPrice && { $lte: Number(query.maxPrice) }),
    };
  }

  return Product.find(filter).populate('category').populate('subcategory');
};

// Get products with filters, search, pagination, sorting
exports.getProductsWithFilters = async ({
  category,
  minPrice,
  maxPrice,
  search,
  page = 1,
  limit = 10,
  sortBy = 'createdAt',
  order = 'desc'
}) => {
  const query = { isDeleted: false };

  if (category) query.category = category;

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' }; // case-insensitive
  }

  const skip = (page - 1) * limit;
  const sortOrder = order === 'asc' ? 1 : -1;

  const products = await Product.find(query)
    .populate('category')
    .populate('subcategory')
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(Number(limit));

  const total = await Product.countDocuments(query);

  return { products, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) };
};

exports.getProductById = async (id) => {
  const product = await Product.findById(id).populate('category').populate('subcategory');
  if (!product || product.isDeleted) throw new Error('Product not found');
  return product;
};

exports.updateProduct = async (id, data) => {
  if (data.name) data.slug = slugifyText(data.name);
  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  return updated.populate('category').populate('subcategory');
};

exports.softDeleteProduct = async (id) => {
  const deleted = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return deleted.populate('category').populate('subcategory');
};

exports.toggleActive = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found');

  product.isActive = !product.isActive;
  await product.save();

  return product.populate('category').populate('subcategory');
};
