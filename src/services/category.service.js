// /server/src/services/category.service.js
const Category = require('../models/Category');

exports.createCategory = async (data) => {
  return Category.create(data);
};

exports.getCategories = async (filter = {}) => {
  const query = { isDeleted: false, ...filter };
  return Category.find(query);
};

exports.getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category || category.isDeleted) throw new Error('Category not found');
  return category;
};

exports.updateCategory = async (id, data) => {
  return Category.findByIdAndUpdate(id, data, { new: true });
};

exports.softDeleteCategory = async (id) => {
  return Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

exports.toggleActive = async (id) => {
  const cat = await Category.findById(id);
  if (!cat) throw new Error('Category not found');

  cat.isActive = !cat.isActive;
  await cat.save();

  return cat;
};
