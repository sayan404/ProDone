const express = require("express")
const router = express.Router()
const { isAuthenticUser, authorizedRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controlers/orderControler");


router.route('/order/new').post(isAuthenticUser, newOrder)
router.route('/order/:id').get(isAuthenticUser, getSingleOrder)
router.route('/orders/me').get(isAuthenticUser, myOrders)
router.route('/admin/orders').get(isAuthenticUser, authorizedRoles("admin"), getAllOrders)
router.route('/admin/order/:id').put(isAuthenticUser, authorizedRoles("admin"), updateOrder).delete(isAuthenticUser, authorizedRoles("admin"), deleteOrder)

module.exports = router