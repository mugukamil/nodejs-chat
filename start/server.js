const log = require('./logger')(module);
const db = require('db');
const User = require('./user');

function run() {
    const vasya = new User('vasya');
    const petya = new User('petya');

    vasya.hello(petya);

    log(db.getPhrase('Hello'));
}

if (module.parent) {
    exports.run = run;
} else {
    run();
}

