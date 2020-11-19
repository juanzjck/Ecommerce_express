var express = require('express');
var router = express.Router();
const {isAuthenticated} = require('../helpers/auth');
const { findByIdAndUpdate } = require('../models/Seed');
var Seed= require('../models/Seed');

router.get('/all_seed',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const seeds=await  Seed.find({});
        var auxSeed=[];
        seeds.map(seed=>{
            auxSeed.push(seed)
        })
        res.render('allSeed',{title:'login',seeds:auxSeed,user:req.user.email,domain:'http://localhost:3000/edit_seed/'});
    }else{
        res.redirect('/')
    }
});

router.get('/new_seed',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
       res.render('newSeed',{title:'Agregar semilla',user:req.user.email});
    }else{
        res.redirect('/')
    }
});

router.post('/new_seed',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {name,category,price,quantity} = req.body
        const errors = [];
        if(name===''||price===''||quantity===''){
            errors.push('Los campos no pueden estar vacios')
        }
        if(errors.length>0){
            res.render('newSeed', { title: 'Agregar semilla', errors });
        }
        try {

            const newSeed = new Seed({name,price,quantity})
            await  newSeed.save()
        } catch (error) {
            console.log(error)
        }
   
        res.redirect('/all_seed')
    }else{
        res.redirect('/')
    }
});

router.get('/edit_seed/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const seed= await Seed.findById(req.params._id)
        const {name,category,price,quantity}=seed;
    
        res.render('editSeed',{title:'Edit seed',url:`http://localhost:3000/edit_seed/${req.params._id}`,_id:req.params._id,name,category,price,quantity,user:req.user.email,urlDelete:`http://localhost:3000/delete_seed/${req.params._id}`});
    }else{
        res.redirect('/')
    }
});

router.post('/edit_seed/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {name,category,price,quantity}=req.body;
        await Seed.findByIdAndUpdate(req.params._id,{name,category,price,quantity})
        res.redirect('/all_seed')
    }else{
        res.redirect('/')
    }
});
router.post('/delete_seed/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {name,category,price,quantity}=req.body;
        await Seed.findByIdAndDelete(req.params._id)
        res.redirect('/all_seed')
    }else{
        res.redirect('/')
    }
});
module.exports = router;
