const mongoose = require('mongoose') ;
const userSchema = new mongoose.Schema({
    name:{type: String, required: true} ,
    email :{type: String , required : true , unique: true} ,
    googlId : { type: String , required : true , unique: true} ,
    avatar :{type : String} ,
    handle : { type: String , required : true , unique: true} ,
    role:{
        type : String ,
        enum : ['student', 'alumni', 'admin'],
        default : 'student'
    } ,
    bio : { type : String , maxLength : 160},
    dept : {type : String} ,

    //networking array
    connections: [{ type: mongoose.Schema.Types.ObjectId , ref : 'User'}] ,
    pendingRequests :[{type: mongoose.Schema.Types.ObjectId , ref:'User'}] ,
    skill:[String],
} ,{timestamp: true}) ;
module.exports = mongoose.model('User' , userSchema) ;