const adminAuth = (req,res,next)=>{

    const token ="xyz";

    const isAuth = token == "xyz2";

    if(!isAuth){
        res.status(401).send("unauthorized");
    }else{
        next()
    }

};  // we are exporting the middleware function form here 

const userAuth = (req,res,next)=>{

    const token ="xyz";

    const isAuth = token == "xyz";

    if(!isAuth){
        res.status(401).send("unauthorized");
    }else{
        next()
    }

};

module.exports ={
    adminAuth,
    userAuth
}