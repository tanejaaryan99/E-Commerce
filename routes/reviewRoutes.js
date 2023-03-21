let express = require('express');
// const {reset} = require('nodemon');
// const Product = require('../../models/product');
const Product = require('../models/product');
const Review = require('../models/review');

let router = express.Router();


router.post('/products/:productId/review', async(req, res)=>{
    let {rating,comment} = req.body;
    let {productId} = req.params;
    let product = await Product.findById(productId);
    let review = new Review({rating,comment});
    product.reviews.push(review);
    await product.save();
    await review.save();    
//    let c1 = req.body.rating;
//    let c2 = req.body.comment;
//    console.log(c1);
//    console.log(c2);
    res.send('review mil gya');

})


module.exports = router;