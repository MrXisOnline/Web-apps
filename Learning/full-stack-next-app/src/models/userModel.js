import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: [true, "Please provide a username"], 
        unique: true
    }, 
    email: {
        type: String, 
        required: [true, "Please provide an email"]
    }, 
    password: {
        type: String, 
        required: [true, "Please provide a password"]
    }, 
    isVerfified: {
        type: Boolean, 
        default: false
    }, 
    isAdmin: {
        type: Boolean, 
        default: false
    }, 
    forgotPasswordToken: String, 
    forgotPasswordTokenExpiry: Date, 
    verifiedToken: String, 
    verfifyTokenExpiry: Date
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;