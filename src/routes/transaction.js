const express = require('express');
const router = express.Router();

const TransactionController = require('../controllers/transactionController'); 


router.post('/', TransactionController.addTransaction);

router.put('/:id', TransactionController.updateTransaction);

router.delete('/:id', TransactionController.deleteTransaction);

module.exports = router;
