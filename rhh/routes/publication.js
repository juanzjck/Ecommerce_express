var express = require('express');
var router = express.Router();
const {isAuthenticated} = require('../helpers/auth');
const { findByIdAndUpdate } = require('../models/Publication');
const Publication= require('../models/Publication');
var Category= require('../models/Category');
const Seed = require('../models/Seed');
const Location=require('../models/Location');
const Points = require('../models/Points');
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

router.get('/new_publication',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const categories= await Category.find({});
        const locations=await Location.find({});
        const auxCategories=categories;
        const seeds= await Seed.find({});
        const auxSeeds=seeds;
       res.render('newPublication',{title:'Agregar publicacion',locations,seeds:auxSeeds,categories:auxCategories,user:req.user.email});
    }else{
        res.redirect('/')
    }
});

router.post('/new_publication',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {priceSpace,space,description,titulo,category,seed,location} = req.body
        const errors = [];
        if(priceSpace===""|| space==="" ||description==="" ||titulo==="" ||category===""){
            errors.push('Los campos no pueden estar vacios')
        }
        if(errors.length>0){
            res.render('newPublication', { title: 'Agregar semilla', errors });
        }
        try {
            const newpublication = new Publication({priceSpace,space,location,description,titulo,category,seeds:seed})
            await  newpublication.save()
        } catch (error) {
            console.log(error)
        }
        res.redirect('/all_publication')
    }else{
        res.redirect('/')
    }
});

router.get('/edit_publication/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const publication= await Publication.findById(req.params._id)
        const {priceSpace, space,description,titulo,category,seeds,location}=publication;
        var categories=[];
        var auxSeeds=[];
        const allCategories= await Category.find({});
        const auxAllCategories=allCategories;
        const allSeed= await Seed.find({});
        const auxAllSeeds=allSeed;
        const locations=await Location.find({});
        const auxlocation=await Location.findById(location)
        new Promise((succes,reject)=>{
             category.map(async(cat)=>{
          
                const auxCategory= await Category.findById(cat)
                categories.push(auxCategory)
            })
            console.log(seeds)
            seeds.map(async(cat)=>{
             console.log(cat)
                const auxSeed= await Seed.findById(cat)
                auxSeeds.push(auxSeed)
            })
            setTimeout(()=>{
                succes('ok')
            },400)
        }).then(()=>{
            res.render('editPublication',{
                title:'Edit publication',
                url:`http://localhost:3000/edit_publication/${req.params._id}`,
                categories:auxAllCategories,
                priceSpace,
                space,
                description,
                titulo,
                _id:req.params._id,
                category:categories,
                user:req.user.email,
                urlDelete:`http://localhost:3000/delete_publication/${req.params._id}`,
                urlAddCategory:`http://localhost:3000/addCategory_publication/${req.params._id}`,
                delete_category:`http://localhost:3000/deleteCategor_publication/${req.params._id}/`,
                allSeeds:auxAllSeeds,
                seeds:auxSeeds,
                locations,
                location:auxlocation
            });
        })

       
    }else{
        res.redirect('/')
    }
});

router.post('/edit_publication/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {priceSpace, space,description,titulo,location}=req.body;
        await Publication.findByIdAndUpdate(req.params._id,{priceSpace,location, space,description,titulo,})
        res.redirect('/all_publication')
    }else{
        res.redirect('/')
    }
});
router.post('/delete_publication/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        await Publication.findByIdAndDelete(req.params._id)
        res.redirect('/all_publication')
    }else{
        res.redirect('/')
    }
});

router.post('/addCategory_publication/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {category}=req.body;
        const publication=await Publication.findById(req.params._id)
        publication.category.push(category)
        await  publication.save();
        //await Publication.findByIdAndUpdate(req.params._id,{category})


        res.redirect(`/edit_publication/${req.params._id}`)
    }else{
        res.redirect('/')
    }
});

router.post('/addSeed_publication/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const {seed}=req.body;
        const publication=await Publication.findById(req.params._id)
        publication.seeds.push(seed)
        await  publication.save();
        //await Publication.findByIdAndUpdate(req.params._id,{category})


        res.redirect(`/edit_publication/${req.params._id}`)
    }else{
        res.redirect('/')
    }
});
router.get('/deleteCategor_publication/:_id/:_id_category',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){

       const publication=  await Publication.findById(req.params._id)
        
       var newCategories=[]
       publication.category.map(category=>{
           if(category!=req.params._id_category){
            newCategories.push(category)
           }
       })
       publication.category= newCategories;
       publication.save()
       res.redirect(`/edit_publication/${req.params._id}`)
    }else{
        res.redirect('/')
    }
});

router.get('/deleteCategor_publication/:_id/:_id_category',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){

       const publication=  await Publication.findById(req.params._id)
        
       var newCategories=[]
       publication.category.map(category=>{
           if(category!=req.params._id_category){
            newCategories.push(category)
           }
       })
       publication.category= newCategories;
       publication.save()
       res.redirect(`/edit_publication/${req.params._id}`)
    }else{
        res.redirect('/')
    }
});
router.get('/deleteSeed_publication/:_id/:_id_seed',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){

       const publication=  await Publication.findById(req.params._id)
        
       var newSeeds=[]
       publication.seeds.map(seed=>{
           if(seed!=req.params._id_seed){
            newSeeds.push(seed)
           }
       })
       publication.seeds= newSeeds;
       publication.save()
       res.redirect(`/edit_publication/${req.params._id}`)
    }else{
        res.redirect('/')
    }
});

router.get('/score/:_id',isAuthenticated, async function(req,res,next){ 
    if(req.user.isAdmin()){
        const newpoint=await Points({publication:req._id,point:1});
        newpoint.save();
        res.redirect('/')
    }else{
        res.redirect('/')
    }
});

module.exports = router;
