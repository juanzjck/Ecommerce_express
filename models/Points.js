const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs')

const PointSchema = new Schema({
    publication:{type:Schema.Types.ObjectId,ref:'Publication'},
    point:{type:Number}
})



module.exports=mongoose.model('Point', PointSchema)