const express =  require('express');
const cors = require('cors');
const mysql = require('mysql');

const appForEmps = express.Router();
appForEmps.use(cors('*'))


var connection = mysql.createConnection({
    host     : "localhost",
    user     :  "root",
    password :  "manager",
    database :  "sdm"
   });

appForEmps.get("/", (request, response)=>{
    connection.query("select * from employee_tb", (error, result)=>{
                if(error==null)
                {
                    var data = JSON.stringify(result) 
                    response.setHeader("Content-Type","application/json");
                    response.write(data);
                } 
                else
                {
                    console.log(error);
                    response.setHeader("Content-Type","application/json");
                    response.write(error)
                }
                response.end();
    })

})


appForEmps.post("/", (request, response)=>{
    var query = 
    `insert into employee_tb values(${request.body.id}, '${request.body.ename}','${request.body.email}','${request.body.password}',${request.body.emp_id},'${request.body.dname}','${request.body.doj}')`;

    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result) 
            response.setHeader("Content-Type","application/json");
            response.write(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)
        }
        response.end();
})
})


appForEmps.put("/:id", (request, response)=>{
    var query = 
    `update employee_tb set dname = '${request.body.dname}',
                    doj = '${request.body.doj}' where id = ${request.params.id}`;

    connection.query(query, (error, result)=>{
                        if(error==null)
                        {
                            var data = JSON.stringify(result) 
                            response.setHeader("Content-Type","application/json");
                            response.write(data);
                        } 
                        else
                        {
                            console.log(error);
                            response.setHeader("Content-Type","application/json");
                            response.write(error)
                        }
                        response.end();
                })
})


appForEmps.delete("/:id", (request, response)=>{
    var query = 
    `delete from employee_tb where id = ${request.params.id}`;
                    
    connection.query(query, (error, result)=>{
                        if(error==null)
                        {
                            var data = JSON.stringify(result) 
                            response.setHeader("Content-Type","application/json");
                            response.write(data);
                        } 
                        else
                        {
                            console.log(error);
                            response.setHeader("Content-Type","application/json");
                            response.write(error)
                        }
                        response.end();
                })
})

module.exports = appForEmps;
