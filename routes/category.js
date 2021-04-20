var express = require('express');
var router = express.Router();
const {isAuthenticated} = require('../helpers/auth');
const { findByIdAndUpdate } = require('../models/Category');
var Category= require('../models/Category');

router.get('/all_category',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const categorys=await  Category.find({});
        var auxcategory=[];
        categorys.map(category=>{
            auxcategory.push(category)
        })
        res.render('allCategory',{title:'login',categories:auxcategory,user:req.user.email,domain:'http://localhost:3000/edit_category/'});
    }else{
        res.redirect('/')
    }
});

router.get('/new_category',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
       res.render('newCategory',{title:'Agregar semilla',user:req.user.email});
    }else{
        res.redirect('/')
    }
});

router.post('/new_category',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {category} = req.body
        const errors = [];
        if(category===''){
            errors.push('Los campos no pueden estar vacios')
        }
        if(errors.length>0){
            res.render('newcategory', { title: 'Agregar semilla', errors });
        }
        try {

            const newcategory = new Category({category})
            await  newcategory.save()
        } catch (error) {
            console.log(error)
        }
   
        res.redirect('/all_category')
    }else{
        res.redirect('/')
    }
});

router.get('/edit_category/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const categoryAux= await Category.findById(req.params._id)
        const {category}=categoryAux;
    
        res.render('editCategory',{title:'Edit category',url:`http://localhost:3000/edit_category/${req.params._id}`,_id:req.params._id,category,user:req.user.email,urlDelete:`http://localhost:3000/delete_category/${req.params._id}`});
    }else{
        res.redirect('/')
    }
});

router.post('/edit_category/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {category}=req.body;
        await Category.findByIdAndUpdate(req.params._id,{category})
        res.redirect('/all_category')
    }else{
        res.redirect('/')
    }
});
router.post('/delete_category/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {name,category,price,quantity}=req.body;
        await Category.findByIdAndDelete(req.params._id)
        res.redirect('/all_category')
    }else{
        res.redirect('/')
    }
});
module.exports = router;
