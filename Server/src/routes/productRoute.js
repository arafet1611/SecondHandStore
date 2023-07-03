const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {
  checkProductOwner,
  authenticateUser,
} = require("../middleWares/authMiddleWare");

// GET /products
router.get("/", productController.getProducts);

// GET /products/:id
router.get("/:id", productController.getProductById);

// DELETE /products/:id
router.delete(
  "/:id",
  authenticateUser,
  checkProductOwner,
  productController.deleteProduct
);

// POST /products
router.post("/", authenticateUser, productController.createProduct);

// PUT /products/:id
router.put(
  "/:id",
  authenticateUser,
  checkProductOwner,
  productController.updateProduct
);
router.get(
  "/myproducts/:id",
  authenticateUser,
  productController.getMyProductList
);
module.exports = router;
