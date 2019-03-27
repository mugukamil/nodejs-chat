module.exports = module => {
    return (...args) => {
        args = [module.filename].concat(...args);
        console.log(...args);
    }
};
