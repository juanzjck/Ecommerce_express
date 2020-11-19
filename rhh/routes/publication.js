var express = require('express');
var router = express.Router();
const {isAuthenticated} = require('../helpers/auth');

router.get('/Publications',isAuthenticated, function(req, res, next) {
  if(req.user.isAdmin()){
    res.render('newUser', { title: 'Nuevo usario' });
  }else{
    req.redirect('/')
  }
  
});
router.get('/new_publication',isAuthenticated, function(req, res, next) {
    if(req.user.isAdmin()){
      res.render('newUser', { title: 'Nuevo usario' });
    }else{
      req.redirect('/')
    }
    
});
router.get('/edit_publication',isAuthenticated, function(req, res, next) {
    if(req.user.isAdmin()){
      res.render('newUser', { title: 'Nuevo usario' });
    }else{
      req.redirect('/')
    }   
});

module.exports = router;
