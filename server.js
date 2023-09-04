require('./helpers/db');   
require('express-async-errors');
const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
const userRout = require('./users/userRout');
const productRout = require('./products/productRout');


app.use(express.json());

app.use(['/user' , '/users'] , userRout);

app.use('/product' , productRout);

app.use((err , req , res , next) =>{
    res.status(404).send({
        message: err.message
    })
})


app.listen(port , ()=>{
    console.log(`server is listening at port ${port}`);
})