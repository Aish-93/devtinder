
const validator = require('validator')
const validateSignUpData = (req) =>{


    const {firstName,lastName,emailId,password} = req.body;

console.log(firstName,lastName,emailId,password)
    if(!firstName ||  !lastName){
        throw new Error("Name is not valid")
    }
    else if (!validator.isEmail(emailId) ){
        throw new Error("Enter valid email")
    }
    else if (!validator.isStrongPassword(password) ){
        throw new Error ("Please enter a strong password")
    }
}

const emailValidtaor = (data)=>{
if(validator.isEmail(data)){
    return true
}else return false
}
module.exports = validateSignUpData;

module.exports= emailValidtaor;

