var express = require('express');
var router = express.Router();
const {isAuthenticated} = require('../helpers/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("----")
  if(req.user){
    res.render('index', { title: 'Express', user:req.user['email']});
  }else{
    res.render('index', { title: 'Express', });
  }
 
});

router.get('/dashboard',isAuthenticated, function(req, res, next) {
  if(req.user.isAdmin()){
    res.render('dashboard', { title: 'Express',user:req.user.email });
  }else{
    res.render('index', { title: 'Express', user:req.user.email});
  }

});

module.exports = router;
