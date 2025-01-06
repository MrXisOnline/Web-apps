"use client";
import axios from "axios"
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage() {

    const router = useRouter();
    const [userData, setUserData] = React.useState({
        username: ''
    });
    async function getUserData() {
        try {
            const response = await axios.get("/api/users/me")
            if (response.data.status !== 200) {
                throw "Error"
            }
            console.log("user data collected");
            return response.data.data; 
        } catch (error:any) {
            console.log('error' + error.message)
        }
    }
    async function Logout(){
        try {
            const response = await axios.get('/api/users/logout');
            if (response.data.status !== 200) {
                throw response.data;
            }
            console.log('logout sucess');
            router.push('/')
        } catch (err) {
            console.log("error: " + err);
        }
    }

    async function ForgotPassword() {
        try {
            const response = await axios.get('/api/users/forgotpassword');
            if (response.data.status !== 200) {
                console.log(response.data);
                throw "error"
            }
            console.log('forgot password email sent!!!')
        } catch (error: any) {
            console.log('caught!')
            console.log(error);
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getUserData();
            setUserData(data);
            console.log(data);
        };
        fetchData();
    }, [])
    return (
        <div className="flex-auto flex flex-col justify-center items-center">
            <h1>Profile</h1>
            <p>{userData.username}</p>
            <button onClick={Logout}>Logout</button>
            <button onClick={ForgotPassword}>Forgot Password</button>
        </div>
    )
}