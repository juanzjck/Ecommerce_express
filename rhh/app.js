const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const favicon = require('express-favicon');



const Handlebars = require('handlebars');
// Import function exported by newly installed node modules.
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

//inicializaciones
const app = express();
require('./database');
require('./config/passport');
//settings this is the real port
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views') );
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', '.hbs');
//middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true,
    cookie : {
    
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//cokie same Site atribute

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sessionConfig.cookie.secure = true; // serve secure cookies
  } 

//global variables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


//routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));

//static files
app.use(express.static(path.join(__dirname, 'public')));
//favicon
//app.use(favicon(path.join(__dirname, '..', 'public', 'LOGOFavicon.png')));
//Server inicializacion
app.listen(app.get('port'), () => {
    console.log(`Server started on port`, app.get('port'));
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
module.exports=app;