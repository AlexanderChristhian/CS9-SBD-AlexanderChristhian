const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// Change from function to direct export
router.get('/getAll', storeController.getAllStores);
router.post('/create', storeController.createStore);
router.get('/:id', storeController.findId);
router.put('/', storeController.updateStore);
router.delete('/:id', storeController.deleteStore);

module.exports = router;
