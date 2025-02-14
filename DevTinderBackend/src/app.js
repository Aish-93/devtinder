// starting file of the application
// creating the backend for dev tider and apis 
// creating the server and listen accepting api request 
// using the express.js creating the server

// console.log("starting the new  project nodejs")

const express = require('express');
const { connectDB }  =require("./config/database")
const app = express();

const User = require("./models/user")


// get will make only get call 

// req is /user it will match /user, /user/xyz, /user/sdkhbks etc
// app.get("/user",(req,res)=>{
// console.log("checked")
// res.send("response1 ");

// console.log("second")
// })

// app.post("/user",(req,res)=>{

//     res.send({
//         name:"Aish",
//         age:31,
//         place:"Bhopal"
//     });
// });

// app.delete("/user",(req,res)=>{

//     res.send("user deleted successfully")
// })


// use is to make all type of calls like post get put etc

// app.use("/home",(req,res)=>{

//     res.send("Hello this is for home")
// });

// app.use("/test",(req,res)=>{

//     res.send("Hello this is for test")
// });

// app.use("/",(req,res)=>{

//     res.send("Hello from server")
// });



// making some advance routes 

// app.get("/abc",(req,res)=>{
//     res.send({
//         firstname:"king",
//         lastName:"kohil"
//     })
// });

// so reguler expressions works here 

// app.get("/ab?c",(req,res)=>{
//     res.send({
//         firstname:"king",
//         lastName:"kohil"
//     })
// });


// so match the patter over here 
// first databse should be connected then server should start hitting


// creating a post api 

app.post("/signup", async (req,res)=>{
    const userObj ={
        firstname:"Virat",
        lastName:"Kohli",
        emailId:"vk18@gmail.com",
        password:"saroj18"
    }
// creating a new instance of the user model
    const user = new User(userObj);

    try{
        await user.save();
        res.send("user added successfully")
    }catch(err){

        res.status("400").send("error in posting data " + err.message);
    }
   

})


connectDB().then(()=>{
    console.log("successfully connected")
    app.listen(3001,()=>{
        console.log("server is running ")
    });// this will connect the database

}).catch( err =>{
    console.log(err)
})

