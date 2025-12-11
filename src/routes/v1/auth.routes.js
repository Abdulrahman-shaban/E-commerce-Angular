// /server/src/routes/v1/auth.routes.js
const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Example protected route (can test with token)
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
