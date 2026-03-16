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

module.exports = { getProducts };