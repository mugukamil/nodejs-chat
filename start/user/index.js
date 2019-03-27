const db = require('db');
const log = require('../logger')(module);

function User(name) {
    this.name = name;
}

User.prototype.hello = who => {
    console.log(`${db.getPhrase('Hello')} ${who.name}`);
};

module.exports = User;
