//Criacao das Rotas
var express = require("express");
var router = express.Router();
const USER_CONTROLLER = require("@src/controllers/user");
const AUTH = require("@src/middlewares/auth");

router.get("/", AUTH, USER_CONTROLLER.getMe);
router.put("/", AUTH, USER_CONTROLLER.update);
router.delete("/", AUTH, USER_CONTROLLER.destroy);

// Verify Email
router.get("/verify-email", AUTH, USER_CONTROLLER.verify_email.send);
router.get("/verify-phone", AUTH, USER_CONTROLLER.verify_phone.send);
router.post("/verify", USER_CONTROLLER.verify_token);


module.exports = router;