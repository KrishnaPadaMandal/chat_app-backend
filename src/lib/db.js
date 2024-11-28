import mongoose from 'mongoose'

export const mongooseConnect = async()=>{
   try {
    const conn = await  mongoose.connect('mongodb+srv://krishnamandalpada:jTVK5JMGPwkTTl4w@cluster2.dj1on.mongodb.net/chat_app?retryWrites=true&w=majority&appName=Cluster2')
   console.log(`MongoDb are connect:${conn.connection.host}`)
    
   } catch (error) {
    console.log('Mongoose Error',error)
    
   }
   
}