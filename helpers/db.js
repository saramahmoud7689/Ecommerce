const mongoose = require("mongoose");

async function db() { 
    await mongoose.connect("mongodb://127.0.0.1:27017/FinalProject");
    console.log("Data connected sucessfully")
}

db().catch((err) =>{console.log(err)});