
const sendMail = require('../helpers/mail');
const mailTemplate= require('../helpers/mailview/mailTemplate');
const sendEmailTo =(usremail,subject,title, content )=>{
    // SEND MAIL
    try{
    
     //var message=mailTemplate("Hola","Tu cuenta a sido creda con exito ahora puedes entrar a <a href='"+domain+"'>ARTMAKEIT</a>");
     var message=mailTemplate(title,content);
    
     sendMail(subject,usremail,message);
     
     }catch(e){
         console.log("error on send mail"+e);
   
     }
   };

   module.exports = sendEmailTo;