function logger(req, res, next) {
    console.log(`${Date()} - ${req.ip} : ${req.path}`);
    next();
}

module.exports = logger;