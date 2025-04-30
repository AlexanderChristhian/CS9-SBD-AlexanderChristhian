const express = require('express');
const fileUpload = require('express-fileupload'); // Middleware for handling file uploads
const itemController = require('../controllers/itemController');

module.exports = () => {
    const router = express.Router();

    // Enable file upload handling
    router.use(fileUpload({ useTempFiles: true }));

    router.post('/create', itemController.createItem);
    router.get('/', itemController.getItems);
    router.get('/:id', itemController.getItemById);
    router.get('/store/:id', itemController.getbyStoreId);
    router.put('/', itemController.updateItem);
    router.delete('/:id', itemController.deleteItem);

    return router;
};