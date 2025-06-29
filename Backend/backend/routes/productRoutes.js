const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload = require('../middleware/upload');
const { getAllProducts, createProduct } = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/image/:id',async(req,res)=> {
    const product = await Product.findById(req.params.id);
    if(product && product.image && product.image.data){
        res.contentType(product.image.contentType);
        res.send(product.image.data);

    }
    else{
        res.status(404).send('image not found');
    }
});
router.post('/upload',upload.single('image'),async (req,res) => {
    try{
        const {name,price,description} = req.body;
        const product = new Product({
            name,
            price,
            description,
            image:{
                data:req.file.buffer,
                contentType:req.file.mimetype
            }


        });
        await product.save();
        res.status(201).json({message:'Image save in mongoDb',product});
    }
    catch(err){
        res.status(500).json({error:'failed to upload image',details:err.message});
    }
});

module.exports = router;
