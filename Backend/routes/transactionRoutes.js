const express = require('express');
const userController = require('../controllers/transactionController');

module.exports = () => {
    const router = express.Router();

    router.post('/create', userController.createTransaction);
    router.post('/pay/:id', userController.payTransaction);
    router.delete('/:id', userController.deleteTransaction);
    router.get('/', userController.getAllTransactions);

    return router;
};