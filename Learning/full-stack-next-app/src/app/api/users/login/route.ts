import {connect} from '@/dbConfig/dbConfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        console.log(reqBody);

        const user = await User.findOne({email})
        console.log(user);
        if (!user){
            return NextResponse.json({
                error: "User Doesn't Exist", 
                status: 500
            })
        }
        const validPassword = bcryptjs.compare(password, user.password);
        if (await !validPassword) {
            return NextResponse.json({
                message: "Incorrect Email/Password", 
                status: 403
            })
        } 

        // create Token
        const tokenData = {
            id: user._id, 
            username: user.username, 
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login Success", 
            success: true, 
            status: 200
        })
        response.cookies.set("token", token, {
            httpOnly: true, 
        })
        return response;
        // else {
        //     return NextResponse.json({
        //         message: "Incorrect Email/Password", 
        //         status: 403
        //     })
        // }

    } catch (error: any) {
        return NextResponse.json({
            error: error.message, 
            status: 500
        })
    }
}