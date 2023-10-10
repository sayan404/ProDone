const express = require("express")

const { getSpecialOffer, createSpecialOffer, updateSpecialOffer, deleteSpecialOffer } = require("../controlers/")
const { isAuthenticUser, authorizedRoles } = require("../middleware/auth")

const router = express.Router()

router.route("/offers").get(getSpecialOffer)
router.route("/offers/new").post(isAuthenticUser,authorizedRoles("admin"),createSpecialOffer)
router.route("/offers/:id").put(isAuthenticUser, authorizedRoles("admin"), updateSpecialOffer).delete(isAuthenticUser, authorizedRoles("admin"), deleteSpecialOffer)

module.exports = router;