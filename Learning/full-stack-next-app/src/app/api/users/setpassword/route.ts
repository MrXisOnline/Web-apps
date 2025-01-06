import User from "@/models/userModel"
import {connect} from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {newPass} = reqBody;
        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({
                message: "No user", 
                status: 404
            })
        }
        const user = await User.findOne({_id: userId});
        if (!user) {
            return NextResponse.json({
                message: "No user", 
                status: 404
            })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = bcryptjs.hash(newPass, salt);
        user.password = hashedPassword;
        const response = await user.save()
        return NextResponse.json({
            message: "Password Changed", 
            status: 200
        })

    } catch (error) {
        return NextResponse.json({
            message: "Error", 
            status: 500
        })
    }
}