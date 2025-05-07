const mongoose = require('mongoose')

require('dotenv').config()

const MongoUri = process.env.MONGODB
console.log(MongoUri)
const connectDb = async()=>{
    try{
        const conn = await mongoose.connect(MongoUri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(error){
        console.log("Error while connecting with DB")
        process.exit(1)
    }
}

module.exports = connectDb