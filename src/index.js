const express= require('express');
const mongoose=require('mongoose');
const route=require('./routes/route');
const cookieParser = require("cookie-parser");
const dotenv =require('dotenv').config()
const {PORT,MONGOOSE_STRING}=process.env;
const app=express()
const cors=require('cors');


app.use(express.json());
app.use(cookieParser(""));
app.use(cors());

mongoose.connect(MONGOOSE_STRING,{usenewurlparser:true})
.then(()=>console.log('connected to mongoose'))
.catch((err)=>console.log(err.message));

app.use('/',route);

app.listen(PORT, ()=>{
    console.log('express running on port',PORT)
})


