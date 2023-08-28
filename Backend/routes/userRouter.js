const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/create", userController.createUser);
router.post("/admin", userController.createAdmin);
router.post("/login", auth.verifyToken, userController.login);
router.post("/adminlogin",  userController.adminLogin);

module.exports = router;
