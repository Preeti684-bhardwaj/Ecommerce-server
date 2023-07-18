const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id:{
      type:String,
      required: true,
      trim: true
    },
    url:{
      type:String,
      required: true,
      trim: true
    },
    detailUrl:{
      type:String,
      required:true,
      trim:true
    },
    title: {
      type: Object,
      required: true,
      unique: true,
      trim: true
    },

    description: {
      type: String,
      // required: true,
      trim: true
    },

    price: {
      type: Object,
      required: true,
    },
    // isFreeShipping: {
    //   type: Boolean,
    //   default: false,
    // },

    // productImage: {
    //   type: String,
    //   required: true,
    // },

    discount: {
      type: String,
    },

    // availableSizes: {
    //   type: [String],
    //   enum: ["S", "XS", "M", "X", "L", "XXL", "XL"],
    // },

    // installments: {
    //   type: Number,
    //   default: 0,
    // },
    tagline:{
      type:String
    },
    deletedAt: {
      type: Date,
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);