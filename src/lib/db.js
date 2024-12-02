import mongoose from 'mongoose'
import dotenv from "dotenv";

const mongoDb_url = process.env.MONGODB_URL
export const mongooseConnect = async()=>{
   try {
    const conn = await  mongoose.connect(mongoDb_url)
   console.log(`MongoDb are connect:${conn.connection.host}`)
    
   } catch (error) {
    console.log('Mongoose Error',error)
    
   }
   
}