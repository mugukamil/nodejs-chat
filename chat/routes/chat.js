const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const { User } = require("../models/user");

router.get("/", function(req, res, next) {
  res.render("chat");
});

module.exports = router;
