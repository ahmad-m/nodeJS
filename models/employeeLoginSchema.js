const mongoose = require('mongoose')


const employeeAuthSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    memberType:{
        type: String,
        required: true
    },
    cnfPassword:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model('employeeAuth', employeeAuthSchema);