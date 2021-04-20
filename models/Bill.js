const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const BillSchema = new Schema({
    billState:{type: String, require: true},
    order:[{type:Schema.Types.ObjectId,ref:'Order'}],
    User:{type:Schema.Types.ObjectId,ref:'User'},
    total:{type:Number}
})



module.exports=mongoose.model('Bill', BillSchema)