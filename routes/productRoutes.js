let express = require('express');
const {reset} = require('nodemon');
const Product = require('../models/product');

let router = express.Router();

router.get('/products', async (req, res) => {
    let products=await Product.find();
    res.render('product/index', {products});
})

router.get('/products/new',(req, res) => {
    res.render('product/new');
})

router.post('/products', async(req, res) => {
    let {name,img,price,desc} = req.body;
    await Product.create({name,img,price,desc});
    res.redirect('/products');

})


// to display perticular route

router.get('/products/:id', async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id);
    res.render('product/show',{foundProduct});

})

// to display the edit form

router.get('/products/:id/edit',async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Product.findById(id);
    res.render('product/edit',{foundProduct});
})


// to actually change the product in db

router.patch('/products/:id',async(req,res)=>{
    let {id} = req.params;
    let {name,price,img,desc} = req.body;
    await Product.findByIdAndUpdate(id, {name,price,img,desc});
    res.redirect('/products')
})
// to delete product
router.delete('/products/:id',async(req,res)=>{
    let {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

module.exports = router;    