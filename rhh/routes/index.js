var express = require('express');
var router = express.Router();
const {isAuthenticated} = require('../helpers/auth');
const Order = require('../models/Order');
const publication = require('../models/Publication');
const Seed =require('../models/Seed');
const CategorySeed=require('../models/CategorySeed');
const Category = require('../models/Category');
/* GET home page. */
router.get('/',async  function(req, res, next) {
  console.log("----")
  const publications = await publication.find({});
  const auxPublication=publications;
  if(req.user){
    
    res.render('index', {publications:auxPublication, title: 'Express', user:req.user['email']});
  }else{
    res.render('index', {publications:auxPublication, title: 'Express', });
  }
 
});

router.get('/dashboard',isAuthenticated,async function(req, res, next) {
  if(req.user.isAdmin()){
    const seed= await Seed.find();
    var seeds=[];
    const categories=await CategorySeed.find({});
    new Promise((succes,reject)=>{
      
      seed.map(async seed=>{
        const orders= await Order.find({seed:seed._id})
        var amount=0;
        var total=0;
        var categories=[];
        seed.category.map(async cat=>{
          const category=await CategorySeed.findById(cat)
          if(category!=null){
            categories.push(category)
          }
        })
        orders.map(async order=>{
          amount=amount+order.seedAmount;
          total=total+(seed.price*order.seedAmount)
        })
        seeds.push({
          seed:seed,
          amount:amount,
          total:total,
          categories
        })
      })
      
   
      setTimeout(() => {
        succes('ok')  
      }, 1000);

    }).then(()=>{
      seeds.sort((a,b)=>(a.total>b.total)?-1:(a.total===b.total)?-1:1)
      const mostSellerSeed=seeds[0];

      res.render('dashboard', {mostSellerSeed,categories,seeds, title: 'Express',user:req.user.email });
    })
  }else{
    res.render('index', { title: 'Express', user:req.user.email});
  }

});

router.post('/dashboard',isAuthenticated,async function(req, res, next) {
  if(req.user.isAdmin()){
    const {dateStart,dateEnd,selectedCategory}=req.body
    console.log(dateStart)
    var seed=undefined;
    if(selectedCategory!=''){
      seed= await Seed.find({category:selectedCategory});
    }else{
      seed= await Seed.find({});
    }
    
    var seeds=[];
  
    const categories=await CategorySeed.find({});
    new Promise((succes,reject)=>{
      
      seed.map(async seed=>{
        var orders=[];
       
        if(dateStart!='' && dateEnd!=''){
          var start=new Date(dateStart)
          start.setDate(start.getDate() -1);
          var end= new Date(dateEnd)
          end.setDate(end.getDate() +1);
          orders= await Order.find({seed:seed._id,date:{$gt:start,$lt:end}})
        }else{
          orders= await Order.find({seed:seed._id})
        }
         var amount=0;
        var total=0;
        var categories=[];
        seed.category.map(async cat=>{
          const category=await CategorySeed.findById(cat)
          if(category!=null){
            categories.push(category)
          }
        })
        orders.map(async order=>{
          amount=amount+order.seedAmount;
          total=total+(seed.price*order.seedAmount)
        })
        seeds.push({
          seed:seed,
          amount:amount,
          total:total,
          categories
        })
      })
      
   
      setTimeout(() => {
        succes('ok')  
      }, 1000);

    }).then(()=>{
      seeds.sort((a,b)=>(a.total>b.total)?-1:(a.total===b.total)?-1:1)
      const mostSellerSeed=seeds[0];

      res.render('dashboard', {dateStart,dateEnd,selectedCategory,mostSellerSeed,categories,seeds, title: 'Express',user:req.user.email });
    })
  }else{
    res.render('index', { title: 'Express', user:req.user.email});
  }
})
module.exports = router;
