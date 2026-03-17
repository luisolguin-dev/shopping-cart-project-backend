const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/products', productRoutes);
app.use('/cart', cartRoutes);


app.listen(port, () => console.log(`Server running on port ${port}...`));