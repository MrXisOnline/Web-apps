import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig"
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({verifiedToken: token, 
                                            // verifyTokenExpiry: {$gt: Date.now()}
                                        });
        console.log(user);
        if (!user) {
            return NextResponse.json({
                message: "Invalid Token", 
                status: 400
            })
        }
        
        user.isVerified = true;
        user.verifiedToken = undefined;
        user.verfifyTokenExpiry = undefined;
        const response = await user.save();
        return NextResponse.json({
            message: "Email Verified", 
            status: 200, 
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message!, 
            status: 500
        })
    }
}