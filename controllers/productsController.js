const productService = require('../services/productsService');

async function createProduct(req, res) {
    try {
        const {name, price} = req.body;
        const newProduct = await productService.createProduct(name, price);
        res.status(201).json(newProduct);

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

async function getProducts(req, res) {
    try {
       const products = await productService.fetchAll();
       res.json(products);
    } catch (err) {
        console.error('Unexpected error', err);
        res.status(500).json({error: err.message})
    }
}

async function getProductById(req, res) {
    try {
        const id = req.params.id;
        const product = await productService.fetchAllById(id);
        res.json(product);

    } catch (err) {
        console.error()
    }
}

module.exports = { getProducts, getProductById, createProduct };

//create cart
//create cartItem
//add cartItems to cart 
//view cart 
//remove item from cart
