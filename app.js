const express = require('express')
const mongoose = require('mongoose')
// const monURL = 'mongodb://localhost/Employee'
const bodyParser = require('body-parser')
var cors =  require('cors')
const app = express()
const dotenv = require('dotenv')

dotenv.config()

const employeeRouter = require('./routes/employee')
const employeeAuthRouter = require('./routes/employeeAuthRoute')

mongoose.connect(process.env.MONGO_DB_CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const dbCon = mongoose.connection
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())
dbCon.once('open', ()=>{
    console.log('DB connected ... !')
})
app.use(cors())
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.options('*', cors())
app.use('/emp', employeeRouter)
app.use('/emp/auth', employeeAuthRouter)

app.listen(9001, ()=>{
    console.log('Server is Running on http://localhost:9001')
})