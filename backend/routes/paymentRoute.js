const express = require("express");
const router = express.Router();
const { processPayment, sendStripeApiKey } = require("../controlers/paymentController");
const { isAuthenticUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticUser, processPayment);

router.route("/stripeapikey").get(isAuthenticUser, sendStripeApiKey);

module.exports = router;