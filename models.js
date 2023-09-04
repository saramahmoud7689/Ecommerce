const mongoose = require('mongoose');
const userSchema = require('./users/userSchema');
const productShema = require('./products/productSchema');
const cartSchema = require('./cart/cartShema');
const usermodel = mongoose.model("user" , userSchema);
const productmodel = mongoose.model("product" , productShema);
const cartmodel = mongoose.model("cart" , cartSchema);

module.exports = {usermodel , productmodel , cartmodel}