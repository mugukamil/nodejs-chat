const crypto = require("crypto");

const mongoose = require("../lib/db");

const Schema = mongoose.Schema;

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

schema.methods.encryptPassword = function(password) {
  return crypto
    .createHmac("sha1", this.salt)
    .update(password)
    .digest("hex");
};

schema
  .virtual("password")
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + "";
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._plainPassword;
  });

schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function(username, password, cb, next) {
  const User = this;

  User.findOne({ username }, (err, user) => {
    if (err) return next(err);
    if (user) {
      if (user.checkPassword(password)) {
        cb(null, user);
      } else {
        next(new Error());
      }
    } else {
      const user = new User({ username, password });
      user.save();
      cb(null, user);
    }
  });
};

exports.User = mongoose.model("User", schema);
