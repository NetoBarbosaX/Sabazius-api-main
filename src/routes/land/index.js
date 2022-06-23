var express = require("express");
var router = express.Router();
const LAND_CONTROLLER = require("@src/controllers/land");
const AUTH = require("@src/middlewares/auth");
const UPLOAD = require("@src/middlewares/upload-firebase");

router.get("/", LAND_CONTROLLER.getAll);
router.post("/", AUTH, LAND_CONTROLLER.create);
router.get("/:id", AUTH, LAND_CONTROLLER.getOne);
router.post("/:id/logo", AUTH, UPLOAD(), LAND_CONTROLLER.uploadLogo);

module.exports = router;
