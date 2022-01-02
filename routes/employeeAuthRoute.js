const express = require('express')
const router = express.Router()
const employeeAuthSchema = require('../models/employeeLoginSchema')
const bcrtpt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', async(req, res)=>{
    //Validatiom
    //Existing email
    const existingEmail = await employeeAuthSchema.findOne({email:req.body.email});
    if(existingEmail) return res.status(400).send("Something wrong please try again");

    const salt = await bcrtpt.genSalt(10);
    const maskedPassword = await bcrtpt.hash(req.body.password, salt)
    const maskedCnfPassword = await bcrtpt.hash(req.body.cnfPassword, salt)
    const emp = new employeeAuthSchema({
        name: req.body.name,
        email: req.body.email,
        password: maskedPassword,
        cnfPassword: maskedCnfPassword,
        memberType:req.body.memberType
         
    })
    try{
        const employee = await emp.save();
        res.json(employee)
    }catch(err){
        req.send(err)
    }
})
router.post('/login', async(req, res)=>{

    const user = await employeeAuthSchema.findOne({email:req.body.email});
    // console.log("user", user)
    if(!user) return res.status(400).send({'error':"Something wrong please try again..!"});

    const userAuth = await bcrtpt.compare(req.body.password, user.password)
    // console.log("userAuth", userAuth)
    if(!userAuth) return res.status(400).send({'error':"Invailid Email or password"});
   
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_KEY)
    res.header('auth-token', token).send({'token':token, 'user':user})
})


module.exports= router