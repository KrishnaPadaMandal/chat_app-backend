import express  from 'express'
import authRoutes from './routes/auth.route.js'
import {mongooseConnect} from '../src/lib/db.js'

const app = express()

app.use(express.json())
app.use('/api/auth',authRoutes)

app.listen(2000,()=>{
    console.log("Server is running")
    mongooseConnect()
})