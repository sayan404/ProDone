const express = require('express')
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserData, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controlers/userControler')
const { isAuthenticUser, authorizedRoles } = require('../middleware/auth')
const router = express.Router()


router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logout)
router.route('/me').get(isAuthenticUser, getUserDetails)
router.route('/password/update').put(isAuthenticUser, updatePassword)
router.route('/me/update').put(isAuthenticUser, updateUserData)
router.route('/admin/users').get(isAuthenticUser,authorizedRoles("admin"),getAllUser)
router.route('/admin/user/:id').get(isAuthenticUser,authorizedRoles("admin"),getSingleUser).put(isAuthenticUser,authorizedRoles("admin"),updateUserRole).delete(isAuthenticUser,authorizedRoles("admin"),deleteUser)
module.exports = router