 const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
 },{
    timestamps: true          //keeps record of created at and updated at from mongoose
 })

 const User = mongoose.model('User', userSchema);

 module.exports = User;