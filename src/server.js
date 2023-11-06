const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000; // Port yang digunakan oleh server (bisa disesuaikan)

// Middleware untuk mengizinkan parsing JSON dalam permintaan
app.use(express.json());

// Import berkas rute-rute yang telah Anda definisikan
const userRoutes = require('./routes/user'); // Sesuaikan dengan path ke berkas user.js
const transactionRoutes = require('./routes/transaction'); // Sesuaikan dengan path ke berkas transaction.js

// Gunakan rute-rute yang telah diimpor
app.use('/user', userRoutes);
app.use('/transaction', transactionRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
