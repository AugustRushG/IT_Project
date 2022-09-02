const withAuth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(404).json({msg:"Unauthorized: Invalid token"})
    }
    return next()
}

module.exports = withAuth;