const express = require('express');
const {getProducts, createProduct, getAllProducts, deleteProduct, updateProduct, getProduct} = require('../controllers/product');
const auth = require('../middleware/auth');

const productRouter = new express.Router();

productRouter.get('/all',auth, getAllProducts);

productRouter.get('/own', auth, getProducts);  

productRouter.get('/:id', auth, getProduct);

productRouter.post('/', auth, createProduct);

productRouter.delete('/:id', auth, deleteProduct);

productRouter.patch('/:id', auth, updateProduct);

module.exports = productRouter;