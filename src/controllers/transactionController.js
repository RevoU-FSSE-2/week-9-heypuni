const Transaction = require('../models/transaction'); // Sesuaikan dengan path ke model transaction

const TransactionController = {};

// Fungsi untuk menambahkan transaksi (income atau expense)
TransactionController.addTransaction = (req, res) => {
  const { type, amount, user_id } = req.body;

  if (!type || !amount || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  Transaction.addTransaction(type, amount, user_id, (err, transactionId) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json({ id: transactionId });
  });
};

// Fungsi untuk mengubah transaksi berdasarkan ID
TransactionController.updateTransaction = (req, res) => {
  const { type, amount, user_id } = req.body;
  const transactionId = req.params.id;

  if (!type || !amount || !user_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  Transaction.updateTransaction(transactionId, type, amount, user_id, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ id: transactionId });
  });
};

// Fungsi untuk menghapus transaksi berdasarkan ID
TransactionController.deleteTransaction = (req, res) => {
  const transactionId = req.params.id;

  Transaction.deleteTransaction(transactionId, (err, affectedRows) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ id: transactionId });
  });
};

module.exports = TransactionController;
