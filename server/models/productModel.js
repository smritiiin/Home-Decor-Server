const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    description : {type: String},
    image: {type: [String]}
},
{timestamps:{createdAt:'created_at',updatedAt:'updated_at'}
})

module.exports = mongoose.model('Product',productSchema)