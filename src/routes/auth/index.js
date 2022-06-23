var express = require("express");
var router = express.Router();
const AUTH_CONTROLLER = require("@src/controllers/auth");
const AUTH = require("@src/middlewares/auth");

router.post("/", AUTH_CONTROLLER.login);
router.post("/register", AUTH_CONTROLLER.register);
router.get("/renew-token", AUTH, AUTH_CONTROLLER.renewToken);
router.get("/reset-password", AUTH_CONTROLLER.resetPassword.sendToken);
router.post("/reset-password", AUTH_CONTROLLER.resetPassword.changePassword);
router.get("/reset-password/validate-token", AUTH_CONTROLLER.resetPassword.validateToken);

module.exports = router;
