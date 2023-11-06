// Import paket yang diperlukan, seperti 'mysql2' untuk menghubungkan ke database
const mysql = require('mysql2');

// Buat koneksi ke database menggunakan konfigurasi dari berkas .env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Definisikan model "User" yang akan digunakan untuk berinteraksi dengan tabel "User"
const User = {};

// Buat fungsi untuk mengambil data pengguna berdasarkan ID
User.getUserById = (id, callback) => {
  const query = `
    SELECT u.id, u.name, u.address,
           SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) as income,
           SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) as expense
    FROM user u
    LEFT JOIN transaction t ON u.id = t.user_id
    WHERE u.id = ?`;

  connection.query(query, [id], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    
    if (results.length === 0) {
      return callback(null, null);
    }

    const user = results[0];

    const userData = {
      id: user.id,
      name: user.name,
      address: user.address,
      balance: parseInt(user.income),
      expense: parseInt(user.expense),
    };

    callback(null, userData);
  });
};

// Export model "User" agar dapat digunakan di bagian lain dari aplikasi Anda
module.exports = User;
