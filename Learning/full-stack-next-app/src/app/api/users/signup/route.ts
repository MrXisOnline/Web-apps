import {connect} from '@/dbConfig/dbConfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import {sendEmail} from "@/helpers/mailer"

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        
        console.log(reqBody);

        // Check user exists
        const user = await User.findOne({email});
        console.log(user);
        if (user) {
            return NextResponse.json({
                error: "User Already Exist", 
                status: 400
            })
        }

        // Encrypt Password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // create user
        const newUser = new User({
            username, 
            email, 
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        const response = await sendEmail(email, 'VERIFY', newUser._id)

        return NextResponse.json({
            message: "User Created", 
            success: true, 
            status: 200,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({
            error: error.message, 
            status: 500
        })
    }
}