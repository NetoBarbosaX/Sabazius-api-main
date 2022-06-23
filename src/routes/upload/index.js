var express = require("express");
var router = express.Router();
const UPLOAD = require("@src/middlewares/upload-firebase");

router.post("/", UPLOAD(), async (req, res) => {
  console.log(req.files);
  let file = req.files.file;
  let url = await file.firebase.getSignedUrl({
    action: "read",
    expires: "03-09-2491",
  });
  res.json({url});
});

module.exports = router;
