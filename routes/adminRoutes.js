const express = require('express');
const { loginPage, login, dashboard, logout } = require('../controllers/adminController');
const { isAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', loginPage);
router.post('/login', login);
router.get('/dashboard', isAuthenticated, dashboard);
router.get('/logout', logout);

module.exports = router;
