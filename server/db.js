const mongoose = require ('mongoose');
const mongourl = "mongodb://localhost:27017/notebook"

const mongodbconnect = ()=>{
    mongoose.connect(mongourl)
    .then(()=>{console.log("Mongodb connected sucessfully")})
    .catch((err)=>console.log("Mongo error",err))
}

module.exports = mongodbconnect