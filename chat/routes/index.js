var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer();
const { User } = require("../models/user");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

router.get("/login", function(req, res, next) {
  res.render("login");
});

router.post("/login", upload.fields([]), function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  User.authorize(username, password, (err, user) => {
    if (err) return next(err);

    req.session.user = user._id;
    res.send({});
  }, next);
});

router.post("/logout", function(req, res, next) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
