const { User } = require("../models/user");

module.exports = (req, res, next) => {
  req.user = res.locals.user = null;

  if (!req.session.user) return next();

  User.findById(req.session.user, (err, user) => {
    if (err) return next(user);

    req.user = res.locals.user = user;
    next();
  });
};
