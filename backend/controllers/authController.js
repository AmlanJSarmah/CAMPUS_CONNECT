const User = require('../models/User') ;
const jwt = require('jsonwebtoken') ;

const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : '30d'}) ;
};

const registerUser = async(req , res) => {
    try {
        const query = [] ;
        if (name) query.push({name}) ;
        if (email) query.push({email}) ;
        if (handle) query.push({handle}) ;
        if (googleId) query.push({googleId}) ;

        const userExists = await User.findOne({ $or : query}) ;
        if(userExists){
            return res.status(400).json({message : "User with this email, handle or googleId already exists"}) ;
    }
        const user = await User.create({
            name , email , googleId  , handle, 
            role : role || 'student'
        }) ;
        
        const token = generateToken(user._id) ;

        res.cookie( 'jwt' , token ,{
            httpOnly : true ,
            secure : process.env.NODE_ENV === 'production' ,
            sameSite : 'strict' ,
            maxAge : 30 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            _id : user._id ,
            name : user.name ,     
            email : user.email ,
            googleId : user.googleId ,
            handle : user.handle ,
            role : user.role
        }) ;
    } catch (error) {
        console.log("Error in registerUser: ", error.message)
        res.status(500).json({message : "Server error"}) ;
    }
} ;

module.exports = {
    registerUser
};