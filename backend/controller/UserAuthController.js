const User = require("../model/userAuth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError") 

//Register a user => api/v1/register
exports.UserRegister = catchAsyncError ( async (req, res, next)=>{

    const { name, email, password} = req.body
    const user= await User.create({
        name,
        email,
        password,
        img:{
            public_id: '',
            url:''
        }
    })

    const token = User.getjwtToken();

    res.status(201).json({
        success:true, 
        token
    })
})

//Login User => /api/v1/login
exports.loginUser = catchAsyncError( async(req, res, next) => {

    const { email, password } = req.body;
    
    //Checks if email and password is entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    //finding user in database
    const isEmailmatch = await User.findOne({ email }).select('+password')

    if(!isEmailmatch){
        return next(new ErrorHandler('Invalid Email or password', 401))
    }

    //checks if password is correct or not
    const isPasswordMatched  = await User.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid  password', 401))
    }

    const token = user.getjwtToken()

    res.status(200).json({
        success : true,
        token
    })
})