const express = require("express");
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
    getProductReviews,
    deleteReview,
    getAllProductsAdmin,
} = require("../controlers/productControler");
const { isAuthenticUser, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products").get( isAuthenticUser , authorizedRoles("admin"),getAllProductsAdmin);
router.route("/admin/product/new").post(isAuthenticUser, authorizedRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticUser, authorizedRoles("admin"), deleteProduct);
// router.route("/product/:id").put(isAuthenticUser, authorizedRoles("admin"), updateProduct).delete(isAuthenticUser, authorizedRoles("admin"), deleteProduct)
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticUser, createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticUser, deleteReview);

module.exports = router;


