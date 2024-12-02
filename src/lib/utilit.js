import jwt from 'jsonwebtoken'

import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY =process.env.SECRET_KEY
export const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},SECRET_KEY,{
        expiresIn:"7d"
    })
    console.log("TOKEN",token)
    res.cookie("jwt",token,{
        maxAge:7*24*60*1000,
        httpOnly:true,
        sameSite:"strict",
        
    })
    return token
}