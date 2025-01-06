import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"


export async function sendEmail(email:any, emailType:any, userId:any) {
    // Looking to send emails in production? Check out our Email API/SMTP product!
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType == "VERIFY") {
            const user = await User.findByIdAndUpdate(userId, {
                    verifiedToken: hashedToken, 
                    verfifyTokenExpiry: Date.now() + 3600000
                }, 
                // {
                //     new: true, 
                //     runValidators: true
                // }
            )
        } else if (emailType == "RESET") {
            const user = await User.findByIdAndUpdate(userId, {
                    forgotPasswordToken: hashedToken, 
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }, 
                // {
                //     new: true, 
                //     runValidators: true
                // }
            )
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: process.env.MAILTRAP_USERNAME!,
            pass: process.env.MAILTRAP_PASSWORD!
            }
        });

        const mailOptions = {
            from: 'suraj@gmail.com', 
            to: email, 
            subject: emailType == 'VERIFY' ? "Verify Your Email" : "Reset Your Password", 
            html: `<p>Click <a href="${process.env.domain}/${emailType == 'VERIFY' ? "" : "profile/"}${emailType == 'VERIFY' ? "verifyemail" : "forgotpassword"}?token=${hashedToken}">here</a> to ${emailType == 'VERIFY' ? "Verify your email" : "Forgot you Password"}</p>`, 
        }

        const response = await transport.sendMail(mailOptions);
        return response;
    } catch (error: any) {
        throw "error: " + error.message!;
    }
}
