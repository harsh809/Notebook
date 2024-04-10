const mongoose = require ('mongoose');
const mongourl = process.env.MONGODB_URL;

const mongodbconnect = ()=>{
    mongoose.connect(mongourl)
   
    .then(()=>{})
    .catch((err)=>console.log("Mongo error",err))
}

module.exports = mongodbconnect