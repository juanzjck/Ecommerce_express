const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    firstName:{type: String, require: true},
    secondName:{type: String, require: true},
    lastName:{type: String, require: true},
    email:{type: String, require: true},
    password:{type: String, require: true},
    role: {type: String, default: "normal"},
    date: {type: Date, default: Date.now}, 
    cedula:{type:String,required:true},
    telefono:{type:String,required:false}
})
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}
UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
} ;

UserSchema.methods.isNormal = function() {
    return (this.role === "normal");
};
UserSchema.methods.isAdmin =  function() {
    return (this.role === "admin");
};
UserSchema.methods.isCasher =  function() {
    return (this.role === "cajero");
};


module.exports=mongoose.model('User', UserSchema)