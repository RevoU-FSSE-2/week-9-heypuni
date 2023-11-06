const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController'); // Sesuaikan dengan path ke controller userController

// Rute untuk mendapatkan informasi pengguna berdasarkan ID
router.get('/:id', UserController.getUserById);

// Anda dapat menambahkan rute-rute lain terkait pengguna di sini sesuai kebutuhan

module.exports = router;
