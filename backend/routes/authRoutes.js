const express = require('express');
const { register, login,deleteAdmin } = require('../controllers/authController');
const authenticateToken=require("../middleware/authMiddleware")
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/delete-admin', authenticateToken, deleteAdmin);

module.exports = router;
