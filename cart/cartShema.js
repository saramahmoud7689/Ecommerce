const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    product:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        }
    ]
})

module.exports = cartSchema