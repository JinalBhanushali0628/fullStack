
const { Mongoose } = require('mongoose');
const Product = require('../model/product');
const Errorhandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError')
const APIFeature = require('../utils/APIFeatures');

//Get All Products => api/v1/product?keyword=laptop => search
//Get All Products => api/v1/product?keyword=laptop&category=earphone => filter
//Get All Products => api/v1/product?keyword=laptop&price[gte]=50000&price[lte]=60000 => advance filter
//Get All Products => api/v1/product?page=3 => pagination
exports.getProduct=catchAsyncError( async (req,res,next) =>{
    
    const productPerPage=5
    const apiFeature = new APIFeature(Product.find(), req.query)
                        .search()
                        .filter()
                        .pagination(productPerPage)

    const products = await apiFeature.query

    res.status(200).json({
        success:true,
        count:products.length,
        products
    })

})

//Get All Products => api/v1/product/:id
exports.getProductById =catchAsyncError( async (req, res, next)=>{

    const product= await Product.findById(req.params.id);

    if(!product){
        return next(new Errorhandler('Product not found', 404))
    }
    res.status(200).json({
        success:true,
        product
    })
})

//post Product => api/v1/admin/product/new
exports.newProduct =  catchAsyncError(async (req, res, next) =>{
    
        const product = await Product.create(req.body);

        res.status(201).json({
            success:true,
            product
        })
})

//Update Product => api/v1/admin/product/:id
exports.updateProduct = catchAsyncError ( async (req,res,next)=>{

    let product = await Product.findById(req.params.id);
    
    if(!product){
        return next(new Errorhandler('Product not found', 404))
    }
    
    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success:true,
        product
    })
})

//Delete Product => api/v1/admin/product/:id
exports.deleteProduct = catchAsyncError( async (req, res, next)=>{
    let product = await Product.findById(req.params.id);
    if(!product)
    {
        return next(new Errorhandler('Product not found', 404));
    }
    await product.remove();
    return res.status(200).json({
        success:true,
        message:'Product Deleted'
    })
})