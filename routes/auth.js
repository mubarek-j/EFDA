const express = require("express");
const req = require("express/lib/request");
const authController = require("../Controllers/auth");
const joi = require("@hapi/joi");
const router = express.Router();

router.post("/register", authController.register);
router.post("/Home-EFDA", authController.message);
router.post("/login", authController.Login);
router.post("/profile", authController.profile);
router.post("/Import", authController.Import);
router.post("/Import1", authController.Import1);
router.post("/logout", authController.logout);
router.get("/showprofile", authController.showProfile);
router.post("/Admin-register", authController.Adminregister);
router.post("/Admin-login", authController.Adminlogin);
router.get("/Admin-message", authController.Adminmessage);
router.get("/Admin", authController.Admin);

module.exports = router;
