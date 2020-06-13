const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const registrationSchema = mongoose.Schema({
    regnum : { type:String , required:true ,unique:true},
    eventName :{ type:String , required:true},
    date : { type:String , required:true},
    fullname: { type:String , required: true },
    mobileno:{ type:String, required: true },
    emailid: { type:String, required: true },
    regtype: {type: String, required:true},
    totaltickets: {type:String, required:true},
    idproof: { type:String, required:true },
    userid : {type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    eventid : {type: mongoose.Schema.Types.ObjectId, ref:"Post", required:true}
});


registrationSchema.plugin(uniqueValidator);
module.exports =  mongoose.model('Registration',registrationSchema);