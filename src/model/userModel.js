const mongoose=require("mongoose")
const validator=require('validator')



const userSchema= new mongoose.Schema({
    fname: {
        type:String,
        required:true,
        trim:true
        },
    email: {
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('not valid email address')
            }
        }
    },
    mobile: {
        type:String,
        required:true,
        unique:true,
        maxlength:10
        }, 
    password: {
        type:String,
        required:true, 
        // minLength: 8, 
        // maxLength: 6
    }, // encrypted password
    cpassword: {
        type:String,
        required:true, 
        // minLength: 8, 
        // maxLength: 6
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    carts:Array

},{timeStamp:true})

// add to cart data
userSchema.methods.addcartdata=async function(cart){
    try{
     this.carts=this.carts.concat(cart);
     await this.save();
     return this.carts
    }catch(error){
     console.log(error)
    }
}
  
module.exports=mongoose.model('USER',userSchema)