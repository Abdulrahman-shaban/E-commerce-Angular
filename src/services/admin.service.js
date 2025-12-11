const User = require('../models/User');
const Order = require('../models/Order');

class AdminService {
  // USER MANAGEMENT
  async getAllUsers() {
    return await User.find().select('-password').sort({ createdAt: -1 });
  }

  async getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) throw new Error('User not found');
    return user;
  }

  async updateUserRole(userId, role) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    user.role = role; // 'user' or 'admin'
    await user.save();
    return user;
  }

  async deleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error('User not found');
    return user;
  }

  // DASHBOARD STATS
  async getStats() {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenueAgg = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const totalRevenue = totalRevenueAgg[0] ? totalRevenueAgg[0].total : 0;
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    return {
      totalUsers,
      totalOrders,
      totalRevenue,
      pendingOrders,
      recentOrders,
    };
  }
}

module.exports = new AdminService();
