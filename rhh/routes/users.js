var express = require('express');
var router = express.Router();
var User= require('../models/User');
const passport = require('passport');
const {isAuthenticated} = require('../helpers/auth');

router.get('/new_user',isAuthenticated, function(req, res, next) {
  if(req.user.isAdmin()){
    res.render('newUser', { title: 'Nuevo usario' ,user:req.user.email});
  }else{
    req.redirect('/')
  }
});

router.post('/new_user',isAuthenticated, async function(req, res, next) {
 if(req.user.isAdmin()){
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
 
console.log(errors)
if(errors.length>0){
  res.render('newUser', { title: 'Nuevo usario', errors });
}else{
  const emailUser = await User.findOne({email: email})
  if(emailUser){
    errors.push('Ya existe un usario con el correo enviado')
    res.render('newUser', { title: 'Nuevo usario', errors,user:req.user.email });
      }else{
        const newUser = new User({firstName, secondName,lastName, dni,telefono,email, password, cedula:dni});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save()
        res.redirect('/all_users')
      }

}
 }
  
});


router.get('/all_users',isAuthenticated,async function(req, res, next) {
  
  if(req.user.isAdmin()){
    const users= await User.find({})
   var auxUsers=[]
   users.map((usr)=>{
    auxUsers.push(usr)
   })

  res.render('allUsers', { title: 'Nuevo usario', usuarios:auxUsers, domain:'http://localhost:3000/edit_user/',user:req.user.email });
  }else{
    res.redirect('/login')
  }
});
router.get('/edit_user/:_id',isAuthenticated,async function(req, res, next) {
  if(req.user.isAdmin()){
    const userId=req.params._id;
    const usr=await User.findById(userId)
    const {firstName, secondName,lastName, cedula,telefono,email, password,password2}=usr;
   console.log({firstName, secondName,lastName, cedula,telefono,email, password,password2})
    res.render('edit_user', { title: 'Nuevo usario',firstName, secondName,lastName, dni:cedula,telefono,email, url:`http://localhost:3000/edit_user/${userId}`,urlDelete:`http://localhost:3000/user_delete/${userId}`,user:req.user.email });
  
  }else{
    res.redirect('/login')
  }
});

router.post('/edit_user/:_id',isAuthenticated,async function(req, res, next) {
  const userId=req.params._id;
  const {firstName, secondName,lastName, dni,telefono,email}=req.body;
  await User.findByIdAndUpdate(userId,{firstName, secondName,lastName, dni,telefono,email});
  res.render('edit_user', { title: 'Nuevo usario',firstName, secondName,lastName, dni,telefono,email, success:true,user:req.user.email });
});

router.post('/user_delete/:_id',isAuthenticated,async function(req, res, next) {
  const userId=req.params._id;
  await User.findByIdAndDelete(userId)
  res.redirect('/all_users')
});
router.get('/login', async function(req,res,next){ 
  res.render('login',{title:'login', domain:'http://localhost:3000/edit_user/'});
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash : true
}));
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');

});
module.exports = router;
