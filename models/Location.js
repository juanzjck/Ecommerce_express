const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs')

const locationSchema = new Schema({
    ciudad:{type: String, require: true},
    provincia:{type: String, require: true},
    pais:{type: String, require: true},
})



module.exports=mongoose.model('Location', locationSchema)