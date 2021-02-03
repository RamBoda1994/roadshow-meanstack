const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    }
    catch(error) {
        res.status(500).send(error);
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({owner: req.user._id});
        res.send(products);
    }
    catch(error) {
        res.status(500).send(error);
    }
}

const createProduct = async (req, res) => {
    try {
        const product = new Product({
            ...req.body,
            owner: req.user._id
        });
        await product.save();
        res.status(201).send(product);
    }
    catch(error) {
        res.status(400).send(error);
    }
}

const getProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).send();
        }
        res.send(product);
    }
    catch(error) {
        res.status(500).send();
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findOneAndDelete({
            _id: productId
        });
        if(!product){
            return res.status(404).send();
        }
        res.send();
    }
    catch(error) {
        res.status(500).send();
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        if(!product) {
            return res.status(404).send();
        }
        res.send(product);
    }
    catch(error) {
        res.status(500).send();
    }
}

module.exports = {
    getAllProducts,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    getProduct
}