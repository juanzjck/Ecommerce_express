var express = require('express');
var router = express.Router();


router.get('/all_publication',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const publications=await  Publication.find({});
        var auxpublication=[];
        publications.map(publication=>{
            auxpublication.push(publication)
        })
        
        res.render('allPublication',{title:'login',publications:auxpublication,user:req.user.email,domain:'http://localhost:3000/edit_publication/'});
    }else{
        res.redirect('/')
    }
});