const Order = require('../models/Order');
const Cart = require('../models/CartTemp');

class OrderService {
  // Create a new order from user's cart
  async createOrder(userId, data) {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    const { shippingAddress, paymentMethod = 'COD', shippingFees = 0 } = data;

    // Prepare items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.price,
      size: item.size || null,
      color: item.color || null
    }));

    const subtotal = cart.totalPrice;
    const total = subtotal + shippingFees;

    // Create order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      shippingFees,
      subtotal,
      total
    });

    // Clear user cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    return await order.populate('items.product').populate('user');
  }

  // Get all orders for a user
  async getUserOrders(userId) {
    return await Order.find({ user: userId })
      .populate('items.product')
      .populate('user')
      .sort({ createdAt: -1 });
  }

  // Get a single order by ID
  async getOrderById(orderId) {
    const order = await Order.findById(orderId)
      .populate('items.product')
      .populate('user');
    if (!order) throw new Error('Order not found');
    return order;
  }

  // Update order status
  async updateOrderStatus(orderId, status) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');

    order.status = status;
    await order.save();

    return await order.populate('items.product').populate('user');
  }

  // Get orders with filters, pagination, sorting (for admin)
  async getOrdersWithFilters({
    status,
    dateFrom,
    dateTo,
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    order = 'desc'
  }) {
    const query = {};

    if (status) query.status = status;

    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    const skip = (page - 1) * limit;
    const sortOrder = order === 'asc' ? 1 : -1;

    const orders = await Order.find(query)
      .populate('items.product')
      .populate('user')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(query);

    return { orders, total, page: Number(page), limit: Number(limit), totalPages: Math.ceil(total / limit) };
  }

  // Delete an order
  async deleteOrder(orderId) {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) throw new Error('Order not found');
    return order;
  }
}

module.exports = new OrderService();
