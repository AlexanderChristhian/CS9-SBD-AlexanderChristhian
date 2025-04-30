const express = require('express');
const storeController = require('../controllers/storeController');

module.exports = () => {
    const router = express.Router();

    router.get('/getAll', storeController.getAllStores);
    router.post('/create', storeController.createStore);
    router.get('/:id', storeController.findId);
    router.put('/', storeController.updateStore);
    router.delete('/:id', storeController.deleteStore);

    return router;
};
