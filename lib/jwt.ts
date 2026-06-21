import jwt from "jsonwebtoken"


const ACCESS_TOKEN = process.env.ACCESS_TOKEN as string
const REFRESH_TOKEN = process.env.REFRESH_TOKEN as string

export const generateAccessToken = (userId: string)=>{
    return jwt.sign({userId}, ACCESS_TOKEN,{
    expiresIn: 15 * 60
   })
}
export const generateRefreshToken = (userId: string)=>{
    return jwt.sign({userId}, REFRESH_TOKEN,{
    expiresIn: "7d"
   })
}


export const verifyAccessToken = (token: string)=>{
return jwt.verify(token, ACCESS_TOKEN)
}

export const verifyRefreshToken = (token: string)=>{
return jwt.verify(token, REFRESH_TOKEN)
}


