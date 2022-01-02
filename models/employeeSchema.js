const mongoose = require('mongoose')

const empEchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: false
    },
    gender:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('empEchema', empEchema);