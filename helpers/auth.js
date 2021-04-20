const helpers = {};

helpers.isAuthenticated = (req, res, next ) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'No autorizado');
    res.render('login',{title:'login',errors:['usario o contraseña erronea']});
};


module.exports = helpers;