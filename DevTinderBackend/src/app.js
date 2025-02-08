// starting file of the application
// creating the backend for dev tider and apis 
// creating the server and listen accepting api request 
// using the express.js creating the server

console.log("starting the new  project nodejs")

const express = require('express');

const app = express();

app.use("/test",(req,res)=>{

    res.send("Hello this is for test")
});

app.use("/",(req,res)=>{

    res.send("Hello from server")
});

app.listen(3001,()=>{
    console.log("server is running ")
});