const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;
const productRoutes = require('./routes/productRoutes');



const app = express();
app.use(cors());
app.use(express.json());


app.use('/products', productRoutes);


app.listen(port, () => console.log(`Server running on port ${port}...`));