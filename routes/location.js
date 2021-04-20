var express = require('express');
var router = express.Router();
const {isAuthenticated} = require('../helpers/auth');
const { findByIdAndUpdate } = require('../models/Location');

const Location= require('../models/Location');
router.get('/new_location',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){

       res.render('newLocation',{title:'Agregar ubicacion',user:req.user.email});
    }else{
        res.redirect('/')
    }
});

router.post('/new_location',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {ciudad,provincia,pais}=req.body;
        const newLocation= new Location({ciudad,provincia,pais});
        newLocation.save();
        res.redirect('/all_locations')
    }else{
        res.redirect('/')
    }
});
router.get('/all_locations',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
    const locations=await Location.find();
       res.render('allLocation',{title:'ubicaciones',locations,user:req.user.email});
    }else{
        res.redirect('/')
    }
});
router.get('/edit_location/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const location = await Location.findById(req.params._id)
       res.render('editLocation',{title:'Modificar ubicacion',location,user:req.user.email});
    }else{
        res.redirect('/')
    }
});
router.post('/edit_location/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {ciudad,provincia,pais}=req.body;
        await Location.findByIdAndUpdate(req.params._id,{ciudad,provincia,pais})
        res.redirect('/all_locations')
    }else{
        res.redirect('/')
    }
});
router.post('/delete_location/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
       
        await Location.findByIdAndDelete(_id,{ciudad,provincia,pais})
        res.redirect('/all_locations')
    }else{
        res.redirect('/')
    }
});
module.exports = router;