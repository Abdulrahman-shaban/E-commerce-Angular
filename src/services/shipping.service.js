const ShippingFees = require("../models/ShippingFees");

class ShippingService {
  async createFee(data) {
    return await ShippingFees.create(data);
  }

  async getAllFees() {
    return await ShippingFees.find().sort({ country: 1, city: 1 });
  }

  async updateFee(id, data) {
    const fee = await ShippingFees.findByIdAndUpdate(id, data, { new: true });
    if (!fee) throw new Error("Shipping fee not found");
    return fee;
  }

  async deleteFee(id) {
    const fee = await ShippingFees.findByIdAndDelete(id);
    if (!fee) throw new Error("Shipping fee not found");
    return fee;
  }

  async getProductsWithFilters({ category, minPrice, maxPrice, search }) {
    const query = {};

    if (category) query.category = category;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.name = { $regex: search, $options: "i" }; // case-insensitive
    }

    return await Product.find(query)
      .populate("category")
      .sort({ createdAt: -1 });
  }
  async getFeeByLocation(country, city) {
    const fee = await ShippingFees.findOne({ country, city });
    if (!fee) throw new Error("Shipping fee not found for this location");
    return fee;
  }
}

module.exports = new ShippingService();
