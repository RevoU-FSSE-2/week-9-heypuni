const express = require('express');
const router = express.Router();

const TransactionController = require('../controllers/transactionController'); // Sesuaikan dengan path ke controller transactionController

// Rute untuk menambahkan transaksi (income atau expense)
router.post('/', TransactionController.addTransaction);

// Rute untuk mengubah transaksi berdasarkan ID
router.put('/:id', TransactionController.updateTransaction);

// Rute untuk menghapus transaksi berdasarkan ID
router.delete('/:id', TransactionController.deleteTransaction);

// Anda dapat menambahkan rute-rute lain terkait transaksi di sini sesuai kebutuhan

module.exports = router;
