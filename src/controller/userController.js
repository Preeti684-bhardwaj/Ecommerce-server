const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const { uploadFile } = require("../aws/awsConfig");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config()
const { SECRET_KEY } = process.env;

const {
  isValidBody,
  isValidName,
  isValidEmail,
  isValidNumber,
  isValid,
  isValidPassword,
  isValidPincode,
  isValidId,
} = require("../utils/validator");

// ===================Register====================================================================
const createUser = async function (req, res) {
  try {
    // const files = req.files;
    const data = req.body;
    const { fname, email, mobile, password, cpassword } = data


    // if (!isValidBody(data)) {
    //   return res.status(400).send({
    //     status: false,
    //     message: "Please provide data in the request body!",
    //   });
    // }

    if (!fname)
      return res
        .status(400)
        .send({ status: false, message: "First Name is required!" });
    if (!isValid(fname) || !isValidName(fname)) {
      return res
        .status(400)
        .send({ status: false, message: "fname is invalid" });
    }

    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "Email is required!" });
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Email is invalid!" });
    }
    let userEmail = await userModel.findOne({ email: email });
    if (userEmail)
      return res.status(422).send({
        status: false,
        message:
          "This email address already exists, please enter a unique email address!",
      });

    if (!mobile)
      return res
        .status(400)
        .send({ status: false, message: "Phone number is required!" });
    if (!isValidNumber(mobile)) {
      return res
        .status(400)
        .send({ status: false, message: "Phone is invalid" });
    }
    let userNumber = await userModel.findOne({ mobile: mobile });
    if (userNumber)
      return res.status(400).send({
        status: false,
        message:
          "This phone number already exists, please enter a unique phone number!",
      });

    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "Password is required!" });
    if (!isValidPassword(password)) {
      return res.status(400).send({
        status: false,
        message:
          "Password should be strong, please use one number, one upper case, one lower case and one special character and characters should be between 8 to 15 only!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    if (!cpassword)
      return res
        .status(400)
        .send({ status: false, message: "Password is required!" });
    if (!isValidPassword(cpassword)) {
      return res.status(400).send({
        status: false,
        message:
          "Password should be strong, please use one number, one upper case, one lower case and one special character and characters should be between 8 to 15 only!",
      });
    }
    if (password !== cpassword) {
      return res.status(400).json({ status: false, message: "password is not matching" })
    }
    const pass = await bcrypt.genSalt(10);
    data.cpassword = await bcrypt.hash(data.cpassword, pass);

    const storedata = await userModel.create(data);
    return res.status(201).json({
      status: true,
      message: "user successfully created",
      data: storedata,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error.message });
  }
};

//==================logIn=====================================================================

const loginUser = async function (req, res) {
  try {
    const { email, password } = req.body
    if (!isValidEmail(email)) {
      return res.status(400).send({ status: false, message: "please enter email correctly" })
    }
    if (!password) {
      return res.status(400).send({ status: false, message: "please enter your password" })
    }
    const userData = await userModel.findOne({ email: email })
    if (!userData) {
      return res.status(400).send({ status: false, message: "please enter correct email" })
    }
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (!passwordMatch) {
      return res.status(400).send({ status: false, message: 'Please enter the correct password' });
    }
    let token = jwt.sign({ _id: userData._id }, SECRET_KEY, { expiresIn: '1d' })
    if (!token) {
      return res.status(400).send({ status: false, message: "try again ..." })
    }
    // console.log(token)
    userData.tokens.push({ token: token });
    await userData.save();
    res.cookie("ecommerce", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true
    })
    // console.log(res)
    return res.status(201).json({ status: true, message: "user login successfuly", token: token })


  } catch (err) {
    return res.status(500).send({ staus: false, message: err.message });
  }
};


//==================================get user=============================================================================

const getUserProfile = async function (req, res) {
  try {
    const validuserone = await userModel.findOne({_id:req.userID});
    // console.log(validuserone + "user hain home k header main pr");
    return res.status(201).json(validuserone);
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//========================logoutProfile==========================================
const logoutProfile  = async function (req, res) {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token
  });

  res.clearCookie("ecommerce", { path: "/" });
  req.rootUser.save();
  // console.log("user logout");
  return res.status(201).json(req.rootUser.tokens);
  } catch (error) {
    console.log("error for logout")
      return res.status(500).send({ status: false, message: error.message })
  }

}

module.exports = { createUser, loginUser, getUserProfile, logoutProfile };