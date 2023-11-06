const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const Transaction = {};

// Fungsi untuk menambahkan transaksi baru (income atau expense)
Transaction.addTransaction = (type, amount, user_id, callback) => {
  const sql = 'INSERT INTO transaction (type, amount, user_id) VALUES (?, ?, ?)';
  const values = [type, amount, user_id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results.insertId);
  });
};

// Fungsi untuk mengubah transaksi berdasarkan ID
Transaction.updateTransaction = (id, type, amount, user_id, callback) => {
  const sql = 'UPDATE transaction SET type = ?, amount = ?, user_id = ? WHERE id = ?';
  const values = [type, amount, user_id, id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results.affectedRows);
  });
};

// Fungsi untuk menghapus transaksi berdasarkan ID
Transaction.deleteTransaction = (id, callback) => {
  const sql = 'DELETE FROM transaction WHERE id = ?';
  const values = [id];

  connection.query(sql, values, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results.affectedRows);
  });
};

module.exports = Transaction;