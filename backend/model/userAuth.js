const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true, 'Please enter Your name'],
        maxlength :[30, 'Your name cannot exceed 30 characters']
    },
    email:{
        type:String,
        required : [true, 'Please enter Your Email'],
        unique : true,
        validate:[validator.isEmail , 'Please enter valid Email Address']
    },
    password:{
        type:String,
        required : [true, 'Please enter Your Password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select:false
    },
    img:{
       public_id:{
            type:String
       },
       url:{
            type:String
       }
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken :  String,
    resetPasswordExpire : Date
})

// Apply the uniqueValidator plugin to UserSchema.
UserSchema.plugin(uniqueValidator);

//Encrypting Password before Saving
UserSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//compare user password
UserSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//Return JWT Token
UserSchema.methods.getjwtToken = function(){
   return jwt.sign({id : this._id}, process.env.JWT_SECRET,{
       expiresIn : process.env.JWT_EXPIRES_TIME
   })
}

//Login User 

module.exports = mongoose.model("User", UserSchema)