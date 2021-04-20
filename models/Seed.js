const mongoose = require('mongoose');
const {Schema} = mongoose;


const SeedSchema = new Schema({
    name:{type: String, require: true},
    category:[{type:Schema.Types.ObjectId,ref:'CategorySeed'}],
    price:{type:Number,default:0},
    quantity:{type:Number,default:0},
    user:{type:Schema.Types.ObjectId,ref:'User'},
})



module.exports=mongoose.model('Seed', SeedSchema)