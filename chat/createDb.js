const mongoose = require("./lib/db");

const open = cb => mongoose.connection.on("open", cb);

const dropDatabase = cb => {
  const db = mongoose.connection.db;
  db.dropDatabase(cb);
};

const requireModels = cb => {
  require("./models/user");

  mongoose.models["User"].ensureIndexes(cb);
};

const createUsers = cb => {
  const createUsersPromise = new Promise((res, rej) => {
    const users = [
      { username: "vasya", password: "secret" },
      { username: "petya", password: "secret" },
      { username: "admin", password: "secret" }
    ];

    for (const u of users) {
      const user = new mongoose.models.User(u);
      user.save().then(res => console.log(res));
    }

    res("okay");
  });

  createUsersPromise.then(res => cb, err => console.log(err));
};

const close = cb => {
  mongoose.disconnect(cb);
};

const dbPromise = new Promise((res, rej) => {
  open(() => {
    dropDatabase();
    requireModels();
    createUsers();
    res("okay");
  });
});

dbPromise.then(res => close(), err => console.log(err));
