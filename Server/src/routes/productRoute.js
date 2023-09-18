const express = require("express");
const router = express.Router();
const upload = require("../multer");
const admin = require("../middleWares/adminMiddleWare");
const productController = require("../controllers/productController");
const { authenticateUser } = require("../middleWares/authMiddleWare");

// GET /products
router.get("/", productController.getProducts);
// GET /products/:id
router.get("/:id", productController.getProductById);

// DELETE /products/:id
router.delete("/:id", authenticateUser, admin, productController.deleteProduct);

// POST /products
router.post(
  "/",
  authenticateUser,
  admin,
  upload.single("image"),
  productController.createProduct
);

// PUT /products/:id
router.put("/:id", authenticateUser, admin, productController.updateProduct);
router.get(
  "/myproducts/:id",
  authenticateUser,
  admin,
  productController.getMyProductList
);
module.exports = router;
