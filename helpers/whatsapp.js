const fetch = require('node-fetch');
var request = require('request'); //bash: npm install request
const whatsapp=()=>{

    var numbers=['+593987256699',];
    // URL for request POST /message
    var url = 'https://api.txtlocal.com/send/';
    var data = {
        phone: '79995253422', // Receivers phone
        body: 'Hello, Andrew!', // Message
    };
    // Send a request
    request({
        url: url,
        method: "POST",
        json: data
    });

}
module.exports = whatsapp;