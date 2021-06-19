const mongoose = require('mongoose');

const Schema  = mongoose.Schema;
const productsSchema = new Schema({
    id:String,
    name:String,
    title:String,
    price:Number,
    description:String
})

module.exports = mongoose.model('product' , productsSchema , 'products');