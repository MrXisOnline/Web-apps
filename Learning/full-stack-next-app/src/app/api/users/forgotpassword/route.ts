import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { sendEmail } from "@/helpers/mailer"

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        console.log(userId)
        if (!userId) {
            console.log('no user id');
            return NextResponse.json({
                message: "No User found", 
                status: 404
            })
        }
        const user = await User.findOne({_id: userId});
        console.log(user)
        if (!user) {
            console.log('no user');
            return NextResponse.json({
                message: "No User found", 
                status: 404
            })
        }
        const response = await sendEmail(user.email, "RESET", userId);
        console.log("DONE!")
        return NextResponse.json({
            message: "Email Sent", 
            status: 200
        })
    } catch (error) {
        console.log('error')
        return NextResponse.json({
            message: "Server Error", 
            status: 500
        })
    }
}

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({forgotPasswordToken: token});
        if (!user) {
            return NextResponse.json({
                message: 'no user with this token', 
                status: 404
            })
        }
        
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        const response = await user.save();
        return NextResponse.json({
            message: "Done!", 
            status: 200
        })
            
    } catch (error) {
        return NextResponse.json({
            message: "Error", 
            status: 500
        })
    }

}