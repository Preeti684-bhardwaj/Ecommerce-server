const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const { isValidId } = require("../utils/validator");
const dotenv =require('dotenv').config()
const {SECRET_KEY}=process.env;


//athentication

const authenticate =async function (req, res, next) {
  try {
    let token = req.cookies.ecommerce;

    // console.log(req)
    const verifyToken = jwt.verify(token,SECRET_KEY);
    // console.log(verifyToken)     
    const rootUser = await userModel.findOne({_id:verifyToken._id,"tokens.token":token});
   

    if(!rootUser){
       throw new Error("User Not Found") };

    req.token = token; 
    req.rootUser = rootUser;   
    req.userID = rootUser._id;   
    next()
} catch(error){
  if(error.message =="Invalid token"){
      return res.status(400).send({status : false, message : "Enter valid token"})
  }
  // console.log(error)
  return res.status(500).json(error.message)
}
};


module.exports = { authenticate };