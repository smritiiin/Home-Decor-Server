const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
   fname: {type: String, required: true}, 
   lname: {type: String, required: true},
   email: {type: String , required: true, unique: true},
   number: {type: Number, required: true, unique:true},
   password: {type: String, required: true},
}, {
    timestamps: true,  //creates createdAt and updatedAt fields
})

module.exports = mongoose.model('User', userSchema)