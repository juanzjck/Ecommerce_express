const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs')

const OrderSchema = new Schema({
    orderState:{type: String, require: true},
    seed:[{type:Schema.Types.ObjectId,ref:'Seed'}],
    Publication:{type:Schema.Types.ObjectId,ref:'Publication'},
    User:{type:Schema.Types.ObjectId,ref:'User'},
    Bill:{type:Schema.Types.ObjectId,ref:'Bill'},
})



module.exports=mongoose.model('Order', OrderSchema)