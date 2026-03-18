const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');


router.get('/:cartId', cartController.getCart);
//router.get('/:cartId/receipt', cartController.getReceipt);
router.post('/items', cartController.addItemToCart);
router.post('/:cartId/checkout', cartController.checkout);
router.delete('/items/:itemId', cartController.removeItem);


module.exports = router;

