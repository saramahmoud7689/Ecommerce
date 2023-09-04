const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const utli = require('util')
const asyncsign = utli.promisify(jwt.sign)
require('dotenv').config
const _ = require('lodash');

const userSchema = new mongoose.Schema({
    email: "string",
    username: "string",
    firstname: "string",
    lastname: "string",
    phonenumber: "string",
    address: "string",
    password: "string",
    isAdmin:{
        type: Boolean,
        default: 'false'
    },
    cart:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
      }
    ]
}
, {
    toJSON:{
        transform : (doc , retuDoc)=> _.omit(retuDoc , ['__v' , 'password' , 'isAdmin'])
    }
}
)

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
      const saltRound = 12
      const hashedpassword = await bcrypt.hash(this.password, saltRound)
      this.password = hashedpassword
    }
  })
  
  
  userSchema.methods.generateToken = function () {
    const token = asyncsign({
      id: this.id,
      email: this.email,
      isAdmin: this.isAdmin
    }, 'kkkk')
    return token
  }



module.exports = userSchema