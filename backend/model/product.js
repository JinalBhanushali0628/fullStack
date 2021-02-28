// const { stringify } = require("qs");

const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter product name'],
        trim:true,
        mixLength:[100,'product name cannot exceed 100 character']
    },
    price:{
        type:Number,
        required:[true,'please enter price'],
        mixLength:[5,'character cannot exceed 5'],
        default:0.0
    },
    description:{
        type:String,
        required:[true,'please enter description']
    },
    rating:{
        type:Number,
        default:0
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,'please enter category'],
        enum:{
            values:[
                'clothes',
                'Electronics',
                'Books',
                'phone',
                'headphone',
                'laptop',
                'food',
                'beauty/health',
                'outdoor',
                'bag',
                'sport',
                'home'
            ],
            message:'please select proper product category.'
        }
    },
    seller:{
        type:String,
        required:[true,'please enter seller name']
    },
    stock:{
        type:Number,
        required:[true,'please enter product stock number'],
        default:0
    },
    numOfReview:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            }
        }
    ],
    createAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model('Product', productSchema);