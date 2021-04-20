const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs')

const PublicationSchema = new Schema({
    titulo:{type: String, require: true},
    description:{type: String, require: true},
    space:{type: Number, require: true},
    priceSpace:{type: Number, require: true},
    user:{type:Schema.Types.ObjectId,ref:'User'},
    category:[{type:Schema.Types.ObjectId,ref:'Category'}],
    seeds:[{type:Schema.Types.ObjectId,ref:'Seed'}],
    location:{type:Schema.Types.ObjectId,ref:'location'}
})



module.exports=mongoose.model('Publication', PublicationSchema);