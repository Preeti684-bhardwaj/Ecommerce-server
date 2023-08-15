const express=require('express')
const router=express.Router()
const {createUser, loginUser, getUserProfile, logoutProfile } = require("../controller/userController");
const {getProduct,getProductById} = require("../controller/productController");
const {createCart,getCart,deleteCart}=require("../controller/cartController")

const mid = require("../middleware/auth");

//========================================= UserController =======================================================//

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/validuser", mid.authenticate, getUserProfile);
router.get("/logout", mid.authenticate,logoutProfile );


//======================================== productController ====================================================//

router.get("/getproducts", getProduct);
router.get("/getproductsone/:id", getProductById);


//======================================= cartController ========================================================//

router.post("/addcart/:id", mid.authenticate, createCart );
router.get("/cartdetails",  mid.authenticate, getCart );
router.delete("/remove/:id",  mid.authenticate,  deleteCart );


module.exports=router