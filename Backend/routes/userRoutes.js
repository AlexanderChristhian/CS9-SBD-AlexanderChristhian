const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ensure these routes match what the frontend is calling
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/:email', userController.findUser);
router.put('/', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/topUp', userController.topUp);

module.exports = router;
