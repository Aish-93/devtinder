const mongoose = require('mongoose');


const connectDB = async() =>{

await mongoose.connect("mongodb+srv://aish2saxena:16yfLk65QpKHP6Uy@studentaish0.v3lxo.mongodb.net/?retryWrites=true&w=majority&appName=StudentAish0/devTinder")// this is connecting to cluster stings passed will be string  but it should be in async await call
};



module.exports ={
    connectDB
}

