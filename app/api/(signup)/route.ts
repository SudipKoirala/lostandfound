import { User } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest)=>{
    const {firstName, lastName, userName, password, confirmPassword} = await req.json()
    if(!firstName || !lastName || !userName || !password || !confirmPassword){
        return NextResponse.json({
            message: "Fill all the fields"
        }, {status: 400})
    }

    if(password !== confirmPassword){
        return NextResponse.json({
            message: "Password and Confirm pass"
        }, {status: 400})
    }

    const existingUser = await User.findOne()

    const user = await User.create({
        firstName, lastName, userName, password
    })

    return NextResponse.json({
        message: "USer created", user
    }, {
        status: 200
    })
}