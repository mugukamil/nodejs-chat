const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true, useCreateIndex: true });

module.exports = mongoose;
