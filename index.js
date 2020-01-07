const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'employeedb'
});
mysqlConnection.connect((err)=>{
    if(!err)
    console.log('database connected');
    else
    console.log('error')
});
//gets all employee details
app.get('/getEmployeeDetails',(req,res)=>{
    sql = 'select * from employee';
    mysqlConnection.query(sql,(err,rows,field)=>{
        if(!err)
        console.log(rows)
     
        else
        console.log('error')
        res.send(rows);
    })
});
//gets an employee details by using id
app.get('/getEmployeeIdDetails/:id',(req,res)=>{
    mysqlConnection.query('select * from employee where empId = ?',[req.params.id],(err,rows,field)=>{
        if(!err)
        console.log(rows)
        else
        console.log('error')
        res.send(rows)
    })
});
//delete an employee
app.delete('/deleteEmployeeDetails/:id',(req,res)=>{
    mysqlConnection.query('delete from employee where empId = ?',[req.params.id],(err,rows,field)=>{
        if(!err)
        console.log("deleted successfully")
        else
        console.log('error')
        res.send("deleted sucessfully")
    })
});
//insert an employee 
app.post('/insertEmployeeDetails', function(req, res) {
       console.log(req.body);
       var empId = req.body.empId;
       var name = req.body.name;
       var empCode = req.body.empCode;
       var salary = req.body.salary;
      // if(req.body.name){console.log(req.body.name)}else{console.log("correct")}
     
    mysqlConnection.query(`Insert into employee(name,empCode,salary) VALUES ("${name}","${empCode}",${salary})`,function(err,rows, result)      
    {                                                      
      if (err)
         throw err;

         console.log("1 record inserted");
         res.send("1 record inserted sucessfully");
    }

    )
   
});

//update employee details
    app.put('/updateEmployeeDetails', function(req, res) {
           
         console.log("hello");
         mysqlConnection.query(`update employee set name = "${req.body.name}" where salary = "${req.body.salary}"`,function(err,result){
             if (err)
             throw err;
         })
         console.log('updated');
         res.send("1 record updated sucessfully")
         })
app.listen(4000,(req,res)=>{console.log("port 4000")});