const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name: {type: String},
    price:{type: Number},
    figure:{type: Number}
})

const ProductObject = mongoose.model('product', ProductSchema);


module.exports = ProductObject;
