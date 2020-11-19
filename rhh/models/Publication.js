const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs')

const PublicationSchema = new Schema({
    titulo:{type: String, require: true},
    description:{type: String, require: true},
    space:{type: Int32Array, require: true},
    priceSpace:{type: Float32Array, require: true},
    user:{type:Schema.Types.ObjectId,ref:'User'},
    category:[{type:Schema.Types.ObjectId,ref:'Category'}],
})



module.exports=mongoose.model('Publication', PublicationSchema)