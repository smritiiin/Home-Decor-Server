const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

// @desc SET new Product
// @route POST/api/products
// @access Public

const setProduct = asyncHandler(async(req,res)=>{
    const {productName, price, quantity,description, image} = req.body
    if(!productName || !price ||!quantity){
        res.status(401)
        throw  new Error ('Please enter all fields')
    }


     //Create Product 
     const product= await Product.create({
        productName,
        price,
        quantity,
        description,
        image
    })

    if(product){
        res.status(201).json({
            _id: product.id,
            productName: product.productName,
            price : product.price,
            quantity: product.quantity,
            description: product.description,
            image: product.image,
            token: generateToken(product._id)
        })
        product.save()
        .then(doc => {
            console.log(doc);
        })
        .catch(err=> {
            console.log("Error Occured: "+ err);
        });
    }
    else{
        res.status(400)
        throw new Error('Invalid product')
    }
})


// @desc Get products data
// @route GET/api/products
// @access Public
const getProduct = asyncHandler(async(req,res) =>{
    const data= await Product.find()

    
    res.status(200).json(data)
})

const updateProduct = asyncHandler(async(req,res)=>{
    res.status(200).json({message: "Updated"})
})

const deleteProduct = asyncHandler(async(req,res)=>{
    res.status(200).json({message: "Deleted"})
})

//Generate JWT
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports ={
    setProduct ,  // create a single product route
    getProduct,   // get all the products in db and send it to client side
    updateProduct,// update one product by its ID
    deleteProduct    //// delete one product by its ID
}