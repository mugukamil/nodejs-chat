const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { ObjectID } = require("mongodb");

/* GET users listing. */
router.get("/", (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);

    res.json(users);
  });
});

router.get("/:id", (req, res, next) => {
  try {
    const id = ObjectID(req.params.id);
  } catch (e) {
    next();
  }
  User.findById(id, (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(404).send("Not Found");
    }

    res.json(user);
  });
});

module.exports = router;
