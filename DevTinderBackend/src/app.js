// starting file of the application
// creating the backend for dev tider and apis
// creating the server and listen accepting api request
// using the express.js creating the server

// console.log("starting the new  project nodejs")

const express = require("express");
const { connectDB } = require("./config/database");
const bcrypt = require('bcrypt')
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
// express.json middlle ware will be activated to all thr routes  by

app.use(express.json());
app.use(cookieParser());

const User = require("./models/user");

const authRouter = require("./routes/auth");

const profileRouter = require("./routes/profile");

const requestRouter = require("./routes/request");

const userRouter = require("./routes/user");


app.use("/",authRouter);

app.use("/",profileRouter);

app.use("/",requestRouter);

app.use("/",userRouter);





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
User.createIndexes()
  .then(() => {
    console.log("Indexes created successfully.");
  })
  .catch((err) => {
    console.log("Error creating indexes:", err);
  });



// find one user getuser




// profile api 


connectDB()
  .then(() => {
    console.log("successfully connected");
    app.listen(3001, () => {
      console.log("server is running ");
    }); // this will connect the database
  })
  .catch((err) => {
    console.log(err);
  });
