const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');

router.post('/items', cartController.addItemToCart);
router.get('/:cartId', cartController.getCart);
router.delete('/items/:itemId', cartController.removeItem);

module.exports = router;

