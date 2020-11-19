var express = require('express');
var router = express.Router();
const {isAuthenticated} = require('../helpers/auth');
const { findByIdAndUpdate } = require('../models/CategorySeed');
var CategorySeed= require('../models/CategorySeed');

router.get('/all_categorySeed',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const categorySeeds=await  CategorySeed.find({});
        var auxcategorySeed=[];
        categorySeeds.map(categorySeed=>{
            auxcategorySeed.push(categorySeed)
        })
        res.render('allCategorySeed',{title:'login',categorySeeds:auxcategorySeed,user:req.user.email,domain:'http://localhost:3000/edit_categorySeed/'});
    }else{
        res.redirect('/')
    }
});

router.get('/new_categorySeed',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
       res.render('newCategorySeed',{title:'Agregar semilla',user:req.user.email});
    }else{
        res.redirect('/')
    }
});

router.post('/new_categorySeed',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {category} = req.body
        const errors = [];
        if(category===''){
            errors.push('Los campos no pueden estar vacios')
        }
        if(errors.length>0){
            res.render('newcategorySeed', { title: 'Agregar semilla', errors });
        }
        try {

            const newcategorySeed = new CategorySeed({category})
            await  newcategorySeed.save()
        } catch (error) {
            console.log(error)
        }
   
        res.redirect('/all_categorySeed')
    }else{
        res.redirect('/')
    }
});

router.get('/edit_categorySeed/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const categorySeed= await CategorySeed.findById(req.params._id)
        const {category}=categorySeed;
    
        res.render('editCategorySeed',{title:'Edit categorySeed',url:`http://localhost:3000/edit_categorySeed/${req.params._id}`,_id:req.params._id,category,user:req.user.email,urlDelete:`http://localhost:3000/delete_categorySeed/${req.params._id}`});
    }else{
        res.redirect('/')
    }
});

router.post('/edit_categorySeed/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {category}=req.body;
        await CategorySeed.findByIdAndUpdate(req.params._id,{category})
        res.redirect('/all_categorySeed')
    }else{
        res.redirect('/')
    }
});
router.post('/delete_categorySeed/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {name,category,price,quantity}=req.body;
        await CategorySeed.findByIdAndDelete(req.params._id)
        res.redirect('/all_categorySeed')
    }else{
        res.redirect('/')
    }
});
module.exports = router;
