const {adminuserName, adminuserEmail,adminuserPassword,adminuserID} = require('./config/page.js');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rh',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(db => console.log('DB conectada')).catch(err => console.error(err)).then(
  async dv=>{
    const User= require('./models/User');
    const user= await User.findOne({email:adminuserEmail});
    if(user===null){
          let newUser=new User({name:adminuserName, email:adminuserEmail,password:adminuserPassword, cedula:adminuserID});
          newUser.password = await newUser.encryptPassword(adminuserPassword);
          newUser.role='admin';
          await newUser.save();
          console.log("El usuario admin fue creado");
    }else{
      console.log(user);
    }
    
  }
);
//This is for the production server 
/*
mongoose.connect('mongodb://username:password@host:port/database?options',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    db: {
        raw: true
      },
      server: {
        poolSize: 10
      }
}).then(db => console.log('DB conectada')).catch(err => console.error(err))
*/
