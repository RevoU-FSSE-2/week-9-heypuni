const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController'); 

router.get('/:id', UserController.getUserById);

module.exports = router;
