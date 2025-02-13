const express = require('express');

const app = express();

const {adminAuth,userAuth } = require("./middlewares/auth")

// app.use("/admin",
//     adminAuth,
// (req,res)=>{
// res.send("authorized data is sent")
// })


app.use("/admin", adminAuth);
app.delete("/admin/delete",(req,res)=>{
    res.send("deleted successfully")
})
app.get("/admin/getAllData",(req,res)=>{

    res.send("send all data")
});


app.use("/user",userAuth,(req,res   )=>{
    res.send("user is sent")
}
)



app.listen(3008,()=>{
    console.log("middleware")
})