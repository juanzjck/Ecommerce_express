var express = require('express');
const { findByIdAndUpdate } = require('../modules/User');
var router = express.Router();
var User= require('../modules/User');

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/new_user', function(req, res, next) {

  res.render('newUser', { title: 'Nuevo usario' });
});

router.post('/new_user', async function(req, res, next) {
  const{firstName, secondName,lastName, dni,telefono,email, password,password2} = req.body
  const errors = [];
  if(firstName==='' || secondName==='' || lastName===''){
    errors.push('Debes de llenar los nombres completos')
  }
  if(dni.split('').length>10 || dni.split('').length<10){
    errors.push('La cedula es erronea')
  }
  if(telefono.split('').length>10 || telefono.split('').length<10){
    errors.push('El numero celular es erroneo')
  }
  if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)){
    errors.push('El correo no tiene el formato correcto')
  }
  if(password==''){
    errors.push('Llenar la contraseña')
  }
  if(!password==password2 ){
    errors.push('La contraseña no coinciden')
  }
  console.log({firstName, secondName,lastName, dni,telefono,email, password,password2})
console.log(errors)
if(errors.length>0){
  res.render('newUser', { title: 'Nuevo usario', errors });
}else{
  const newUser = new User({firstName, secondName,lastName, dni,telefono,email, password, cedula:dni});
  await newUser.save()
  res.redirect('/all_users')
}
});


router.get('/all_users',async function(req, res, next) {
   const users= await User.find({})
   var auxUsers=[]
   users.map((usr)=>{
    auxUsers.push(usr)
   })
  res.render('allUsers', { title: 'Nuevo usario', usuarios:auxUsers, domain:'http://localhost:3000/edit_user/' });
});
router.get('/edit_user/:_id',async function(req, res, next) {
  const userId=req.params._id;
  const usr=await User.findById(userId)
  const {firstName, secondName,lastName, cedula,telefono,email, password,password2}=usr;
 console.log({firstName, secondName,lastName, cedula,telefono,email, password,password2})
  res.render('edit_user', { title: 'Nuevo usario',firstName, secondName,lastName, dni:cedula,telefono,email, url:`http://localhost:3000/edit_user/${userId}`,urlDelete:`http://localhost:3000/user_delete/${userId}` });
});

router.post('/edit_user/:_id',async function(req, res, next) {
  const userId=req.params._id;
  const {firstName, secondName,lastName, dni,telefono,email}=req.body;
  await User.findByIdAndUpdate(userId,{firstName, secondName,lastName, dni,telefono,email});
  res.render('edit_user', { title: 'Nuevo usario',firstName, secondName,lastName, dni,telefono,email, success:true });
});

router.post('/user_delete/:_id',async function(req, res, next) {
  const userId=req.params._id;
  await User.findByIdAndDelete(userId)
  res.redirect('/all_users')
});
module.exports = router;
