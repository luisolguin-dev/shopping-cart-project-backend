const productService = require('../services/productsService');

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

module.exports = { getProducts, getProductById };