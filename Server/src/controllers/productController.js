const Product = require("../models/product");
const checkProductOwner = require("../middleWares/authMiddleWare");
const upload = require("../multer"); // Import the Multer middleware
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,

      description,
      category,
      price,
      expiresOn,
      shippingAddress,
    } = req.body;
    const { filename } = req.file;
    const product = new Product({
      user: req.user._id,
      name,
      image: filename,
      description,
      category,
      price,
      expiresOn,
      shippingAddress,
    });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      description,
      category,
      price,
      expiresOn,
      shippingAddress,
    } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        image,
        description,
        category,
        price,
        expiresOn,
        shippingAddress,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getMyProductList = async (req, res) => {
  try {
    const userId = req.params.id;

    // Retrieve the count of user's products
    const productCount = await Product.countDocuments({ user: userId });

    // Retrieve the user's product list
    const productList = await Product.find({ user: userId });

    res.status(200).json({ productCount, productList });
  } catch (error) {
    console.error("Error getting user product list:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getMyProductList,
};
