const appMiddleware = (req, res, next) => {
    console.log("inside app middile ware");
    next()
}
module.exports = appMiddleware