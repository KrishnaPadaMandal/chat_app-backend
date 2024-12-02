import express from 'express';
import authRoutes from './routes/auth.route.js';
import { mongooseConnect } from '../src/lib/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config(); 
const port = process.env.PORT || 3000; 

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  mongooseConnect(); 
});
