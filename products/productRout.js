const express = require('express');
const rout = express.Router();
const { add , getById , getAll , edit , del} = require('./productApis');
const {adminauthorized} = require('../middleware');
const jwt = require('jsonwebtoken');

rout.get('/' , getAll);
rout.get('/:id' , getById);
rout.post('/' ,adminauthorized, add);//admin
rout.patch('/edit/:id' ,adminauthorized, edit);//admin
rout.delete('/del/:id' ,adminauthorized, del);//admin


module.exports = rout;