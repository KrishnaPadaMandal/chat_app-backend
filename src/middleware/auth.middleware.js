import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY


export const protectRoute = async (req,res,next) =>{
    try {
        console.log("req.cookies",req.cookies)
        const token = req.cookies.jwt
        if(!token)
        {
            return res.status(401).json({message:"Unauthorized-no token Provided"})
        }
        const decode = jwt.verify(token,SECRET_KEY)
        if(!decode)
        {
            return res.status(401).json({message:"Unauthorized-no - Invalid Token"})
  
        }
        const user = await User.findById(decode.userId).select("-password")
        if(!user)
        {
            return res.status(404).json({message:"User is not found"})
        }
        req.user = user
        next()
        
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
        
    }
}

