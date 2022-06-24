var express = require("express");
var router = express.Router();
const LAND = require("@src/controllers/land");

router.post("/", LAND.submit);

module.exports = router;
