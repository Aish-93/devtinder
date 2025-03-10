const jwt = require("jsonwebtoken");
const User = require("../models/user");

const adminAuth = (req,res,next)=>{

    const token ="xyz";

    const isAuth = token == "xyz2";

    if(!isAuth){
        res.status(401).send("unauthorized");
    }else{
        next()
    }

};  // we are exporting the middleware function form here 

// const userAuth = (req,res,next)=>{

//     const token ="xyz";

//     const isAuth = token == "xyz";

//     if(!isAuth){
//         res.status(401).send("unauthorized");
//     }else{
//         next()
//     }

// };
// read the token form cookies 
// validate the token and find the user

const userAuth = async (req,res,next )=>{

    // read the token 
 try{   const cookies = req.cookies;

    const { token } = cookies;

    if(!token){
        throw new Error("Token is not valid!!!")
    }

    const decodedDataObject = await jwt.verify(token, "Aish@rocky@00");

    const { _id } = decodedDataObject;

    //find the user in the database

    const user = await User.findById(_id);

    if(!user){
        throw new Error("user not found !!!");
    }

    req.user= user;

    next()
    }catch(err){
        res.status(400).send("Error :" + err.message)
    }

}

module.exports ={
    adminAuth,
    userAuth
}