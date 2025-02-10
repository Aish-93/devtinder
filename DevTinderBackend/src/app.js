// starting file of the application
// creating the backend for dev tider and apis 
// creating the server and listen accepting api request 
// using the express.js creating the server

console.log("starting the new  project nodejs")

const express = require('express');

const app = express();


// get will make only get call 

app.get("/user",(req,res)=>{

    res.send({
        name:"Aish",
        age:31,
        place:"Bhopal"
    });
})

app.post("/user",(req,res)=>{

    res.send({
        name:"Aish",
        age:31,
        place:"Bhopal"
    });
});

app.delete("/user",(req,res)=>{

    res.send("user deleted successfully")
})


// use is to make all type of calls like post get put etc

app.use("/home",(req,res)=>{

    res.send("Hello this is for home")
});

app.use("/test",(req,res)=>{

    res.send("Hello this is for test")
});

app.use("/",(req,res)=>{

    res.send("Hello from server")
});




app.listen(3001,()=>{
    console.log("server is running ")
});