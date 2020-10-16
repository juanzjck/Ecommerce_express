const helpers = {};

helpers.isAuthenticated = (req, res, next ) => {
    if(req.isAuthenticated()){
        return next();
    }
    console.log('error')
    req.flash('error_msg', 'No autorizado');
    res.redirect('/login');
};


module.exports = helpers;