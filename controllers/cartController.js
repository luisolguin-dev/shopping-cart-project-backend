const cartServices = require('../services/cartServices')

async function addItemToCart(req, res) {
    try{
        const { cartId, productId, quantity } = req.body;
        const productAdded = await cartServices.addItemToCart(
            cartId,
            productId,
            quantity
        )
        return res.status(201).json(productAdded);

    } catch (err) {
        res.status(500).json({error: err.message})

    }

}

async function getCart(req, res) {
    try{
        const cartId = req.params.cartId;
        const cart = await cartServices.getCart(cartId);

        return res.json(cart);

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

async function removeItem(req, res) {
    try {
        const itemId = req.params.itemId;
        const result = await cartServices.removeItem(itemId);
        
        return res.json(result);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
   

}

async function getReceipt(req, res) {
    try {
        const cartId = req.params.cartId;
        const receipt = await cartServices.getReceipt(cartId);
        
        return res.json(receipt)

    }
    catch (err) {
        res.status(500).json({error:err.message})
    }
}

module.exports = { addItemToCart, getCart, removeItem, getReceipt}