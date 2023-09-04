const express = require('express');
const rout = express.Router();
const models = require('../models')
const usermodel = models.usermodel
const productmodel = models.productmodel
const cartmodel = models.cartmodel
const bcrypt = require("bcrypt");
const customError = require('../helpers/customError')
const jwt = require('jsonwebtoken')
const utli = require('util');
const { find } = require('lodash');
const asyncverify = utli.promisify(jwt.verify)
const secretkey = 'kkkk'



const signup = async (req , res , next) =>{
  const { email, username, firstname, lastname, phonenumber , address , password , isAdmin} = req.body;
  const existemail = usermodel.find({ email });

      if (existemail) {
       res.status(401).send("user exist");
      }
      const newuser = new usermodel({
        email,
        username, 
        firstname, 
        lastname, 
        phonenumber , 
        address , 
        password,
        isAdmin
      });
      
      newuser.save()
      const token = await newuser.generateToken();
      res.status(200).send(token);
};

const login = async (req , res , next) =>{
  const { email, password } = req.body;
  const finduser = await usermodel.findOne({ email });

  if (!finduser) {
    next(
      customError({
        statusCode: 401,
        message: "password or email is not correct",
      })
    );
  }
  const copmarpass = await bcrypt.compare(password, finduser.password);
  if (copmarpass) {
    const token = await finduser.generateToken();
    res.status(200).send(token);
  }

  next(
    customError({
      statusCode: 401,
      message: "password or email is not correct",
    })
  );
};

const getById = async (req , res , next) =>{
  const { id } = req.params;
  const fineuser = await usermodel.findById(id);
  if (fineuser) res.send(fineuser);
  next(
    customError({
      statusCode: 404,
      message: "user not found",
    })
  );
}

const getAll = async (req , res , next) =>{
  const { id } = req.params;
  const fineuser = await usermodel.find();
  res.send(fineuser)
}

const edit = async (req , res , next) =>{
  const { id } = req.params;
  const { email, username, firstname, lastname, phonenumber , address , password } = req.body;
  const edituser = await usermodel.findByIdAndUpdate(id, {
    email, 
    username, 
    firstname, 
    lastname, 
    phonenumber , 
    address , 
    password
  });
  res.status(200).send("updated");
}

const del = async (req , res , next) =>{
  const {id} = req.params;
  const deleteUser = await usermodel.findByIdAndDelete(id);
  res.status(200).send("deleted");
}

const addToCart = async (req , res , next) =>{
  const {productid} = req.params;
  const { authorization: token } = req.headers
  const decoded = await asyncverify(token, secretkey)
  const finduser = await usermodel.findById(decoded.id);
  const product = await productmodel.findById(productid);
  finduser.cart.push(product)
  finduser.save()
  res.send(finduser.cart)

}

const cancelOrder = async (req , res , next) =>{
  const {authorization: token} = req.headers;
  const decoded = await asyncverify(token , secretkey);
  const finduser = await usermodel.findById(decoded.id);
  finduser.cart = []
  finduser.save()
  res.send(finduser.cart)
}

const verifyOrder = async (req , res , next) =>{
  const {authorization: token} = req.headers;
  const decoded = await asyncverify(token , secretkey);
  const finduser = await usermodel.findById(decoded.id);
  const cart = finduser.cart;
  finduser.cart = [];
  finduser.save()

  const newCart = new cartmodel({
    user: finduser,
    product: cart
  });

  newCart.save();

  res.send(newCart)
}



module.exports = {signup , login , getById , getAll , edit , del , addToCart , cancelOrder , verifyOrder}