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


module.exports = { addItemToCart, getCart }