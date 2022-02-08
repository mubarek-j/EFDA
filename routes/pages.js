const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth");

router.get("/", (req, res) => {
  res.render("Home-EFDA");
});

router.get("/Login", (req, res) => {
  res.render("Login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/show-profile", (req, res) => {
  res.render("show-profile");
});

router.get("/Import", (req, res) => {
  res.render("Import");
});

router.get("/Import1", (req, res) => {
  res.render("Import1");
});

router.get("/Admin", (req, res) => {
  res.render("Admin");
})

router.get("/Admin-message", (req, res) => {
  res.render("Admin-message");
})

router.get("/Admin-login", (req, res) => {
  res.render("Admin-login");
})

router.get("/Admin-register", (req, res) => {
  res.render("Admin-register")
})

module.exports = router;
