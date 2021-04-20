
const User =require('../models/User');
var QRCode = require('qrcode');
const {service,auth,portemail,domain,pageemail }=require('../config/page');
const nodemailer=require('nodemailer');
var base64ToImage = require('base64-to-image');
var templateEmail=require('./mailview/template');
const sendmailQR = async (id, usremail)=>
{
    try{

        
    var urlSend =String(domain)+'/order/'+id;
    
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
    var messaje="<div>";
    messaje=messaje+'<h1 style="text-align: center;">Gracias por tu pago</h1>';
    messaje=messaje+'<p style="text-align: center;"> Este es el codigo QR de tu transacción</p>'
    await QRCode.toDataURL(urlSend,{type:'image/png'}, function (err, url) {
        try{
            console.log(url);
        var stringB46=url+"";
        var file=B64ToImage("./public/qrImages/",stringB46,(id+""));
        messaje=messaje+'<div style="text-align: center;"><img src="cid:image1@image.com" width="250px"/></div>';
        messaje=messaje+'<p style="text-align: center;">Presentando el codigo QR para retirar tu pedido</p></di>';
        messaje= templateEmail(messaje);
        var mailOptions = {
            from: pageemail,
            to: usremail,
            subject: 'Gracias por tu pago',
            html: messaje,
            attachments:[{
                filename : file.fileName,
                path: './public/qrImages/'+file.fileName,
                cid : 'image1@image.com'
            }]
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
                console.log(e);
        }
        
          
        });
  
    }catch(e){

        
    }


        

};
//64 to image return a file info
const B64ToImage=(path,stringB64,fileName)=>{
 try{
    var optionalObj = {'fileName': fileName, 'type':'png'};
    var imageInfo = base64ToImage(stringB64,path,optionalObj);
    return imageInfo;
 }catch(e){
    console.log(e);
 }

}
module.exports = sendmailQR;