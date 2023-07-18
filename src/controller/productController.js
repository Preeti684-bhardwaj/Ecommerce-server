const productModel = require("../model/productModel");
const {uploadFile} = require("../aws/awsConfig");
const {
  isValid,
  isValidPrice,
  isValidAvailableSizes,
  isValidId,
  isValidNumbers,
  isValidBody,
  isValidName,
} = require("../utils/validator");
const products = require("../Productdata/Productdata");

//============================================== createProduct =============================================//

// let createProduct = async function (req, res) {
//   try {
//     const data =JSON.parse(req.body.body);
//     let {
//       title,
//       description,
//       price,
//       currencyId,
//       currencyFormat,
//       isFreeShipping,
//       style,
//       availableSizes,
//       installments,
//     } = data;

//     if (!isValidBody(data)) {
//       return res
//         .status(400)
//         .send({
//           status: false,
//           message: "Please provide data in request body",
//         });
//     }

//     if (!title)
//       return res
//         .status(400)
//         .send({ status: false, message: "Title is required!" });

//     if (!isValid(title)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Title is invalid!" });
//     }

//     let uniquetitle = await productModel.findOne({ title: title });
//     if (uniquetitle)
//       return res.status(400).send({
//         status: false,
//         message: "This title already exists, please enter another title.",
//       });

//     if (!description)
//       return res
//         .status(400)
//         .send({ status: false, message: "Description is required!" });

//     if (!isValid(description)) {
//       return res
//         .status(400)
//         .send({ status: false, msg: "descritions is invalid!" });
//     }

//     if (!price)
//       return res
//         .status(400)
//         .send({ status: false, message: "Price is required!" });

//     if (!isValidPrice(price)) {
//       return res.status(400).send({ status: false, msg: "Price is invalid!" });
//     }

//     if (!currencyId)
//       return res
//         .status(400)
//         .send({ status: false, message: "Currency Id is required!" });

//     // if (currencyId != "INR")
//     //   return res.status(400).send({
//     //     status: false,
//     //     msg: "Please provide the currencyId as `INR`!",
//     //   });

//     if (!currencyFormat)
//       return res
//         .status(400)
//         .send({ status: false, message: "Currency Format is required!" });

//     // if (currencyFormat != "₹")
//     //   return res.status(400).send({
//     //     status: false,
//     //     message: "Please provide the currencyformat as `₹`!",
//     //   });

//     if (isFreeShipping) {
//       if (!(isFreeShipping == "true" || isFreeShipping == "false")) {
//         return res.status(400).send({
//           status: false,
//           message: "isFreeShipping should either be True, or False.",
//         });
//       }
//     }

//     let files = req.files; //aws

//     if (files && files.length > 0) {

//       let uploadedFileURL = await uploadFile(files[0]);

//       data.productImage = uploadedFileURL;
//     } else {
//       return res.status(400).send({ message: "Files are required!" });
//     }

//     if (!isValid(style)) {
//       return res.status(400).send({ status: false, msg: "Style is invalid" });
//     }

//     if (availableSizes) {
//       // availSizes = availableSizes.split(",").map((x) => x.trim());
//       data.availableSizes = availableSizes;

//       if (!isValidAvailableSizes(availableSizes))
//         return res.status(400).send({
//           status: false,
//           message: "availableSizes is required or put valid sizes",
//         });
//     }

//     if (!isValid(installments) || !isValidNumbers(installments)) {
//       return res
//         .status(400)
//         .send({ status: false, message: "Installments' is invalid" });
//     }

//     const document = await productModel.create(data);
//     res.status(201).send({ status: true, message: "Success", data: document });
//   } catch (err) {
//     res.status(500).send({ staus: false, message: err.message });
//   }
// };

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
  // createProduct,
  getProduct,
  getProductById,
};