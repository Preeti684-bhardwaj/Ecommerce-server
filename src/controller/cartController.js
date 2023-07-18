const userModel = require("../model/userModel");
const productModel = require("../model/productModel");


// creating cart but based on condition that if cart exist then update otherwise create new cart 
const createCart = async function (req, res) {
    try {
        const {id}= req.params;
       
            const cart= await productModel.findOne({ id:id, isDeleted: false })
            
            const userExist = await userModel.findOne({_id:req.userID})
      
            if (userExist) {
                const cartData = await userExist.addcartdata(cart);

                await userExist.save();
                return res.status(201).json(userExist);
              }
        

            return res.status(201).json({ status: true, message: "cart created", data: userExist });

    }

    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


//====================================================== GetCart =======================================================//


const getCart = async function (req, res) {
    try {
        const buyuser=await userModel.findOne({_id:req.userID})
        if (!buyuser) return res.status(400).send({ status: false, message: "userid must be present in params" });

        return res.status(200).json(buyuser)

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//=================================================== DeleteCart ======================================================//

const deleteCart = async function (req, res) {
    try {
        const { id } = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((curel) => {
            return curel.id != id
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("iteam remove");  
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { createCart, getCart, deleteCart };



