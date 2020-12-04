const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs')

const OrderSchema = new Schema({
    orderState:{type: String, require: true},
    seed:{type:Schema.Types.ObjectId,ref:'Seed'},
    publication:{type:Schema.Types.ObjectId,ref:'Publication'},
    User:{type:Schema.Types.ObjectId,ref:'User'},
    bill:{type:Schema.Types.ObjectId,ref:'Bill'},
    space:{type:Number},
    seedAmount:{type:Number},
    date:{type:Date}
})



module.exports=mongoose.model('Order', OrderSchema)