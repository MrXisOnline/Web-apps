import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message: "Logout success", 
            success: true, 
            status: 200
        })
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)});
        return response;
    } catch (err) {
        return NextResponse.json({
            message: "Can't logout", 
            status: 500
        })
    }
}