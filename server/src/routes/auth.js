"use strict";
const express = require("express");

const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post("/login", AuthController.login);
router.get("/logout", AuthController.checkLogin, AuthController.logout);
router.post("/register", AuthController.checkUserRoleAtRegistration, AuthController.register);
router.post("/change-password", AuthController.checkLogin, AuthController.changePassword);

module.exports = router;