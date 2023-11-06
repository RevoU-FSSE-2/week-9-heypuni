const User = require('../models/user'); // Sesuaikan dengan path ke model user

const UserController = {};

// Fungsi untuk mendapatkan informasi pengguna berdasarkan ID
UserController.getUserById = (req, res) => {
  const userId = req.params.id;

  User.getUserById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  });
};

// Fungsi lain untuk mengelola logika pengguna bisa ditambahkan di sini

module.exports = UserController;
