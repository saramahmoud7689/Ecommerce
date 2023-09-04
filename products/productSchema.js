const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:"string",
    price:"number",
    descrption:"string"
})


module.exports = productSchema

