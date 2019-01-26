module.exports = function(req, res, next){
    //we assume that this function will be executed only after 'auth' function
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');
    next();
}