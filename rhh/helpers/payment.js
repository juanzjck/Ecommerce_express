
var https = require('https');
var querystring = require('querystring');
const { promises } = require('fs');

const fetch= (amount)=>{
    try {
     
        var path='/v1/checkouts';
        var data = querystring.stringify( {
        'entityId':'8a829418533cf31d01533d06f2ee06fa',
        'amount':`${amount}`,
        'currency':'USD',
        'paymentType':'DB'
        });
        var options = {
        port: 443,
        host: 'test.oppwa.com',
        path: path,
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': data.length,
        'Authorization':'Bearer OGE4Mjk0MTg1MzNjZjMxZDAxNTMzZDA2ZmQwNDA3NDh8WHQ3RjIyUUVOWA=='
        }
        };
        var result=null
   
       var promise= new Promise((s,r)=>{
            var postRequest =https.request(options, function(res) {
                res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                        jsonRes = JSON.parse(chunk);
                          console.log(jsonRes)
                           result= jsonRes
                        }); })
               
                postRequest.write(data);
                postRequest.end(); 
                setTimeout(()=>{
                    s('ok')
                },2000)           
        })
       
        

            
           
            return result
            
      
      
        
    } catch (error) {
       console.log(error) 
       return undefined
    }
}

module.exports = fetch;
