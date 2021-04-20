var express = require('express');
var router = express.Router();
const {isAuthenticated} = require('../helpers/auth');
const Order = require('../models/Order');

const Publication = require('../models/Publication');
const Seed = require('../models/Seed');
const Bill=require('../models/Bill');

router.get('/add_order/:_id',isAuthenticated,async function(req, res, next) {
    if(req.user){
      
      const publication= await Publication.findById(req.params._id)
      var seeds=[];
      console.log(publication.seeds);
     
     new Promise((succes,reject)=>{
        publication.seeds.map(async cat=>{
            const seed= await Seed.findById(cat)
  
            if(seed!=null){
                seeds.push(seed)
            }
      })
      setTimeout(()=>{
        succes('ok')
      },200)
     }).then(()=>{
        res.render('addOrder', { title: 'Express',seeds,user:req.user.email,publication});
     })
     
    }else{
      res.render('/login', { title: 'Express'});
    }
  });
  router.post('/add_order/:_id',isAuthenticated,async function(req, res, next) {
    if(req.user){
       const {space,seed,seedAmount}=req.body 
       const seedAux=await Seed.findById(seed);
       console.log(`${seedAux.quantity} ${seedAmount}`)
       if(Number(seedAux.quantity)>Number(seedAmount) && Number(seedAmount)>0){
        seedAux.quantity=seedAux.quantity-seedAmount;
        seedAux.save();
        const publication=await Publication.findById(req.params._id)
        publication.space=publication.space-space;
        publication.save();
        const date=Date.now();
        const newOrder= new Order({seedAmount,User:req.user._id,publication:req.params._id,date,space,seed,orderState:"WAITING_PAY"})
        newOrder.save();
        res.redirect('/checkOut/'+newOrder._id);
       }else{
        res.redirect('/add_order/'+req.params._id);
       }
 
    }else{
      res.render('/login', { title: 'Express'});
    }
  });

  router.get('/checkOut/:_id',isAuthenticated,async function(req, res, next) {
    if(req.user){
      const order = await Order.findById(req.params._id);
      const publication = await Publication.findById(order.publication)
      const seed= await Seed.findById(order.seed)
      const total = (seed.price*order.seedAmount)+(publication.priceSpace*order.space)
      res.render('checkout', { title: 'Express',order,total,seed,user:req.user.email,publication});
    }else{
      res.redirect('/login')
    }
  })
  
  router.post('/checkOut/:_id',isAuthenticated,async function(req, res, next) {
    if(req.user){
      const order = await Order.findById(req.params._id);
      order.orderState="COMPLETE";
      const publication = await Publication.findById(order.publication)
      const seed= await Seed.findById(order.seed)
      const total = (seed.price*order.seedAmount)+(publication.priceSpace*order.space)
      const bill = new Bill({billState:'payed',order:order._id,total});
      bill.save();
      order.bill=bill;
      order.save();
      res.redirect('/all_orders');
    }else{
      res.redirect('/login')
    }
  })

  
  router.get('/all_orders',isAuthenticated,async function(req, res, next) {
    if(req.user){
      const orders = await Order.find({});
      res.render('allOrders', { title: 'Express',orders,user:req.user.email});
    }else{

    }
  })

    
  router.get('/edit_order/:_id',isAuthenticated,async function(req, res, next) {
    if(req.user){
      const {_id,orderState,seed,publication,date,User,bill,space,seedAmount} = await Order.findById(req.params._id);
      const publicationObjt=await Publication.findById(publication)
      const seedObjt=await Seed.findById(seed)
      const billObj=await Bill.findById(bill)
      res.render('editOrder', {date, _id,title: 'Express',bill:billObj,seed:seedObjt,publication:publicationObjt,orderState,seedAmount,space,user:req.user.email});
    }else{
      res.redirect('/login')
    }
  })
module.exports = router;
