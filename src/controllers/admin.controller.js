const adminService = require('../services/admin.service');

// User management
exports.getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.json({ ok: true, users });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await adminService.getUserById(req.params.id);
    res.json({ ok: true, user });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await adminService.updateUserRole(req.params.id, role);
    res.json({ ok: true, user });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await adminService.deleteUser(req.params.id);
    res.json({ ok: true, user });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};

// Dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await adminService.getStats();
    res.json({ ok: true, stats });
  } catch (err) {
    res.status(400).json({ ok: false, message: err.message });
  }
};
