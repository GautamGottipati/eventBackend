const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    fullname: { type:String , required: true },
    password:{ type:String, required: true },
    mobileno : { type:String, required: true },
    emailid : {type: String, required:true ,unique:true},
    usertype : { type: String }
});

userSchema.plugin(uniqueValidator);

module.exports =  mongoose.model('User',userSchema);