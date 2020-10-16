
const User =require('../models/User');
var QRCode = require('qrcode');
const {service,auth,portemail,domain,pageemail }=require('../config/page');
const nodemailer=require('nodemailer');
var base64ToImage = require('base64-to-image');
var templateEmail=require('./mailview/template');
const sendMail = async (subject, usremail,messaje)=>
{
  try{
      
  //config
  var transporter = nodemailer.createTransport({
    pool: true,
    host: service,
    portemail:portemail,
    secure: false, // use TLS
    auth: {
      user: auth.user,
      pass: auth.pass
    },
    tls: {
        rejectUnauthorized: false
      },
  });
  //send info
  var mailOptions = {
    from: pageemail,
    to: usremail,
    subject: subject,
    html: messaje,
   /* attachments:[{
        filename : file.fileName,
        path: './public/qrImages/'+file.fileName,
        cid : 'image1@image.com'
    }]*/
  };
  //send email
  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }

    });       
  }catch(e){
    console.log('Error:' + e);
  }

};

module.exports = sendMail;