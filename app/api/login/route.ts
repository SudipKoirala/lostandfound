import { setAuthCookies } from "@/lib/auth-cookies";
import { connectDB } from "@/lib/connectDb";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { User } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const { userName, password } = await req.json()
    try {
        await connectDB()

        if (!userName || !password) {
            return NextResponse.json({
                message: "Fill up all the fields"
            }, {
                status: 400
            }
            )
        }


        const user = await User.findOne({ userName })
        if (!user) {
            return NextResponse.json({
                message: "Try loggin with valid credentials"
            }, {
                status: 401
            }
            )
        }

        const validPass = await user.comparePassword(password)

        if (!validPass) {
            return NextResponse.json({
                message: "Try loggin with valid credentials"
            }, {
                status: 401
            })
        }

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        user.refreshToken = refreshToken;
        await user.save();

        const res = NextResponse.json({
            message: "Logged in successfully!"
        }, {
            status: 200
        })

        setAuthCookies(res, accessToken, refreshToken)
        return res;
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({
            message: "Login Failed"
        }, {
            status: 400
        })
    }



}