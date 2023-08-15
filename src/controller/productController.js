const productModel = require("../model/productModel");

//============================================== getProduct ===============================================//

const getProduct = async function (req, res) {
  try {
    const productsdata= await productModel.find();
     res.status(200).json(productsdata);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//====================================== getProductById =================================================//

const getProductById = async function (req, res) {
  try {
    let {id} = req.params;
    let productData = await productModel.findOne({
      id:id,
      isDeleted: false,
    });
    if (!productData) {
      return res.status(404).send({ status: false, message: "Product not exist" });
    }

    res.status(200).json( productData );
  } catch (err) {
    // return res.status(400).json( productData );
    return res.status(500).send({ satus: false, err: err.message });
  }
};


module.exports = {
  getProduct,
  getProductById,
};