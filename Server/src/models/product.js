const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    expiresOn: {
      type: Date,
      required: true,
    },
    shippingAddress: {
      address: {
        type: String,
      },
      city: {
        type: String,
        default: "mahdia",
      },
      shippingCharge: {
        type: Number,
        required: true,
        default: 7,
      },
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
