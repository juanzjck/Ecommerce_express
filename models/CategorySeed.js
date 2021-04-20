const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs')

const CategorySeedSchema = new Schema({
    category:{type: String, require: true},
})



module.exports=mongoose.model('CategorySeed', CategorySeedSchema)