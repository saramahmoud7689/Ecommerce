const express = require('express');
const jwt = require('jsonwebtoken')
const rout = express.Router();
const bcrypt = require("bcrypt");
const customError = require("../helpers/customError");
const usermodel = require("../models");
const {signup , login , getById , getAll , edit , del, addToCart, cancelOrder , verifyOrder} = require('./userApis')
const {userauthorized , adminauthorized} = require('../middleware')
const joi = require('joi')

const validateRequest = (schema) => async (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {  
      throw new Error(error);
    }

    return next();
  };

const validatinSchema =  joi.object().keys({
    email : joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    username: joi.string().min(4),
    firstname: joi.string().min(4),
    lastname: joi.string().min(4),
    phonenumber: joi.string().pattern(new RegExp('^01[0-2,5]{1}[0-9]{8}$')),
    address: joi.string(),
    password:joi.string().pattern(new RegExp('^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}$')),
    isAdmin:joi.boolean().default(false)
  })

rout.post('/signup' , validateRequest(validatinSchema), signup);
rout.post('/login' , login);
rout.get('/:id' ,adminauthorized, getById);
rout.get('/' ,adminauthorized, getAll);
rout.patch('/edit/:id' , edit);
rout.delete('/del/:id' , del);
rout.post('/addtocart/:productid' ,userauthorized, addToCart);
rout.post('/cancelorder' ,userauthorized, cancelOrder);
rout.post('/verifyorder' ,userauthorized, verifyOrder)

module.exports = rout