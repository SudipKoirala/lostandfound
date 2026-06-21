import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const isProduction = process.env.NODE_ENV === "production"

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refrshToken";




export const setAuthCookies = (
    res: NextResponse,
    accessToken: string,
    refreshToken: string  
)=>{
res.cookies.set(ACCESS_TOKEN, accessToken,{
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 15 * 60,
    path:"/"
}),

res.cookies.set(REFRESH_TOKEN, refreshToken,{
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 7 * 24* 60 * 60 ,
    path:"/"
})
}

 export const setAccessCookies = (
  res: NextResponse,
    accessToken: string,
)=>{
    res.cookies.set(ACCESS_TOKEN, accessToken,{
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 15 * 60,
    path:"/"
})
}

export const clearAuthCookies = (
    res: NextResponse
)=>{
    res.cookies.set(ACCESS_TOKEN,"", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 0,
    path:"/"
}),
    res.cookies.set(REFRESH_TOKEN,"", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 0,
    path:"/"
})
}

