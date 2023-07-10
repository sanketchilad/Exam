const express = require('express');
const config = require('config');

const app = express();

const empRelatedRoutes = require('./routes/server');

app.use((request, response, next)=>{
    response.setHeader('Access-Control-Allow-Origin',"*");
    response.setHeader('Access-Control-Allow-Headers',"*");
    response.setHeader('Access-Control-Allow-Methods', "*")
    next();
})


app.use(express.json()); //to convert binary to json

app.use('/emps',empRelatedRoutes)

const portNo = config.get("PORT");
app.listen(portNo,()=>{console.log("Server Started at " + portNo)})