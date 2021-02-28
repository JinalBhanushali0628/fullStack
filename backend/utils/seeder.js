const dotenv = require('dotenv');
const databaseConnect = require('../config/database');
const Product = require('../model/product');
const products = require('../data/product');

//setting dotenv file
dotenv.config({path: 'backend/config/config.env'});
 
databaseConnect();

const seedProduct = async ()=>{
    try {
        await Product.deleteMany();
        console.log('products are deleted');

        await Product.insertMany(products);
        console.log("products are inserted");
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

 seedProduct();
