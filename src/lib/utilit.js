import jwt from 'jsonwebtoken'
const SECRET_KEY ="sdjksjdshduwu43455nmsfbnjsdfbhfbndjsahfsabfhbhfdgbdfb sh"
export const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},SECRET_KEY,{
        expiresIn:"7d"
    })
    res.cookie("jwt",token,{
        maxAge:7*24*60*1000,
        httpOnly:true,
        sameSite:"strict",
        
    })
    return token
}