const express = require("express");
const router = express.Router();

const {setProduct, getProduct, updateProduct, deleteProduct} = require('../controllers/productController');

router.post('/', setProduct)
router.get('/', getProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)



module.exports=router;