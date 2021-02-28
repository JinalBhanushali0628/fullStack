const express = require('express');

const router= express.Router();

const {getProduct, newProduct, getProductById, updateProduct, deleteProduct}= require('../controller/productController');

// get Route Path
router.route('/product').get(getProduct);

//get Product By ID route Path
router.route('/product/:id').get(getProductById);

//Post Route Path
router.route('/admin/product/new').post(newProduct);

//Update Product Route Path
router.route('/admin/product/:id').put(updateProduct);

//Delete Product Route Path
router.route('/admin/product/:id').delete(deleteProduct);

module.exports=router;