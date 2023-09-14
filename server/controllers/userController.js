const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user
// @route POST/api/users
// @access Public
const registerUser = asyncHandler(async (req,res) =>{
    const { fname, lname, email, number, password, confirmPassword}= req.body

    if (!fname || !lname || !email || !number || !password || !confirmPassword){
        res.status(400)
        throw new Error ('Please add all the fields')
    }

    // Check if user exists
    const userExists = await User.findOne({email})
    if (userExists){
        res.status(400)
        throw new Error ('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword1 = await bcrypt.hash(password, salt)
    const hashedPassword2 = await bcrypt.hash(confirmPassword, salt)

    //Create User 
    const user= await User.create({
        fname,
        lname,
        number,
        email,
        password: hashedPassword1,
        confirmPassword: hashedPassword2
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            fname: user.fname,
            lname : user.lname ,
            email: user.email,
            number: user.number,
            token: generateToken(user._id)
        })
        user.save()
        .then(doc => {
            console.log(doc);
        })
        .catch(err=> {
            console.log("Error Occured: "+ err);
        });
    }
    else{
        res.status(400)
        throw new Error('Invalid user')
    }
    // res.json({message: 'Register User'})
})


// @desc Authenticate a user
// @route POST/api/users/login
// @access Public
const loginUser = asyncHandler(async(req,res) =>{
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            fname: user.fname,
            lname : user.lname ,
            email: user.email,
            number: user.number,
            token: generateToken(user._id)
        })
    } else{
        res.status(400)
        throw new Error ('Invalid Email or Password');
    }
})

// @desc Get user data
// @route GET/api/users/me
// @access Private
const getMe = asyncHandler(async(req,res) =>{
    const {_id, fname, lname, email, number} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        fname,
        lname, 
        email,
        number
    })
})

//Generate JWT
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports={
    registerUser,
    loginUser,
    getMe,
}




















//Copied for Goals

// const asyncHandler = require('express-async-handler')

// const User = require("../models/userModel")

// //@desc  GET users
// //@routr GET/api/users
// //@access Private

// const getUsers = asyncHandler(async(req,res) =>{
//     const users = await User.find()
//     res.status(200).json(users)
// })

// //@desc  SET users
// //@routr POST/api/users
// //@access Public

// const setUsers = asyncHandler(async (req,res) =>{
//     if(!req.body.fname){
//         res.status(400)
//         throw new Error('Please add first name')
//     }
//     if(!req.body.lname){
//         res.status(400)
//         throw new Error('Please add last name')
//     }
//     if(!req.body.email){
//         res.status(400)
//         throw new Error('Please add email')
//     }
//     if(!req.body.number){
//         res.status(400)
//         throw new Error('Please add number')
//     }
//     if(!req.body.password){
//         res.status(400)
//         throw new Error('Please add password')
//     }
//     if(!req.body.confirmPassword){
//         res.status(400)
//         throw new Error('Please add password again')
//     }
//     const user = await User.create({
//         fname: req.body.fname,
//         lname: req.body.lname,
//         email: req.body.email,
//         number: req.body.number,
//         password: req.body.password,
//         confirmPassword: req.body.confirmPassword
//     })
//     user.save()
//     .then(doc => {
//         console.log(doc);
//     })
//     .catch(err=> {
//         console.log("Error Occured: "+ err);
//     });
//     res.status(200).json(user)
// })

// //@desc  UPDATE users
// //@routr PUT/api/users/:id
// //@access Private

// const updateUsers = asyncHandler(async(req,res) =>{
//     const user = await User.findById(req.params.id)

//     if (!user){
//         res.status(400)
//         throw new Error('User not found')
//     }

//     const updateUser = await User.findByIdAndUpdate(req.params.id, req.body,{
//         new: true,
//     })
//     res.status(200).json(updateUser)
// })

// //@desc  DELETE users
// //@routr DELETE/api/users/:id
// //@access Private

// const deleteUsers = asyncHandler(async(req,res) =>{
//     const user = await User.findByIdAndDelete(req.params.id);
//     if(!user){
//         res.status(400)
//         throw new Error("User Not Found")
//     }
 
//     await user.remove()

//     res.status(200).json({id: req.params.id})
// })

// module.exports = { 
//     getUsers, setUsers, updateUsers, deleteUsers
// }









