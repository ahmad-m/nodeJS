const express = require('express')
const router = express.Router()
const empEchema = require('../models/employeeSchema')
const verification = require('../models/authenticationMwr');


router.get('/',verification ,async(req, res)=>{
    // res.send('i am ready to fetch...!')
    try{
        const employee = await empEchema.find();
        res.json(employee);
    }catch(err){
        res.send(err)
    }
})

router.post('/', verification, async(req, res)=>{
    // console.log(req.body.name);
    const emp = new empEchema({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        isActive: req.body.isActive,   
    })
    try{
        const employee = await emp.save();
        res.json(employee)
    }catch(err){
        req.send(err)
    }
})

router.get('/:id', verification, async(req, res)=>{
    try{
        const empByID = await empEchema.findById(req.params.id)
        res.json(empByID);
    }catch(err){
        res.send(err)
    }
});
router.delete('/:id',verification,  async(req, res)=>{
    try{
        const empDeleted = await empEchema.deleteOne({_id:req.params.id})
        res.json(empDeleted);
    }catch(err){
        res.send(err);
    }
})
router.put('/:id',verification,  async(req, res)=>{
    try{
        const employee = await empEchema.findById(req.params.id);
        // console.log('BackEnd- ',req.body.name)
        employee.name = req.body.name;
        employee.email = req.body.email;
        employee.gender = req.body.gender;
        employee.phoneNumber = req.body.phoneNumber;
        employee.isActive = req.body.isActive;
        await employee.save()
        // console.log(newemployee)
        res.json(employee)
    }catch(err){
        res.send(err)
    }
})


module.exports= router