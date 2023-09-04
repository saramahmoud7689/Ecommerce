const express = require('express');
const models = require('../models')
const productmodel = models.productmodel
const customError = require('../helpers/customError');
const { result } = require('lodash');

const add = async (req , res , next) =>{
    const {name , price , descrption} = req.body;
        const newproduct = await productmodel.create({
            name,
            price,
            descrption
        })
        res.status(200).send(newproduct)

}

const getById = async (req , res , next) =>{
    const {id} = req.params;
    const findproduct = await productmodel.findById(id);
    if(findproduct) res.send(findproduct);
    next(
        customError({
            statusCode: 404,
            message:"product not found"
        })
    );
}

const getAll = async (req , res , next) =>{
    const getusers = await productmodel.find();
    res.send(getusers);
    next(
        customError({
            statusCode: 404,
            message: "can't find users"
        })
    )
}

const edit = async (req , res , next) =>{
    const {id} = req.params;
    const {name , price , descrption} = req.body;
    const updateproduct = await productmodel.findByIdAndUpdate(id , {
        name,
        price,
        descrption
    });
    res.send(updateproduct)

}

const del = async (req , res , next) =>{
    const {id} = req.params;
    const deleteproduct = await productmodel.findByIdAndDelete(id);
    res.send("product deleted");
}

module.exports = { add , getById , getAll , edit , del}