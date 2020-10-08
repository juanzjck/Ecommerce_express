var express = require('express');
var router = express.Router();
var User= require('../modules/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/new_user', function(req, res, next) {

  res.render('newUser', { title: 'Nuevo usario' });
});

router.post('/new_user', function(req, res, next) {
  const{firstName, secondName,lastName, dni, cedula,telefono,email, password,password2} = req.body
  const errors = [];
  if(firstName==='' || secondName==='' || lastName===''){
    errors.push('Debes de llenar los nombres completos')
  }
  
if(errors.length>0){
  res.render('newUser', { title: 'Nuevo usario' });
}else{
  res.redirect('/')
}


});


router.get('/all_users', function(req, res, next) {
  
  res.render('allUsers', { title: 'Nuevo usario' });
});
router.get('/edit_user', function(req, res, next) {
  
  res.render('edit_user', { title: 'Nuevo usario' });
});

router.post('/user/delete:_id', function(req, res, next) {
  
  res.redirect('all_users')
});
module.exports = router;
