const express = require('express');


const app = express();


app.get("/",(req,res,next)=>{

    console.log("1 res")
    next();
    
  
},(req,res,next)=>{
    console.log("2 res")
    next();
},

(req,res)=>{
console.log("3rd res")
    res.send("last response")
    console.log("4th res")
});

app.get
app.listen(3000,()=>{
    console.log("multi is running")
});
