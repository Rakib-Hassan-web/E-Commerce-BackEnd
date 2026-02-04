const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    FullName: {
        type: String,
        require: true,
    },
    Email: {
        type: String,
        require: true,
        unique: true
    },
    Password: {
        type: String,
        require: true,
        
    },
    Phone:{
        type:String
    },
    Role:{
        type:String,
        default:"user",
        enum : ["user" , "admin" ,]
    }
})

module.exports =mongoose.model( "User" ,userSchema)