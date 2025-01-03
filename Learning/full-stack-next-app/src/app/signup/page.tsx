"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "", 
        password: "", 
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            if (response.data.status !== 200 ){
                throw response.data;
            }
            console.log("Signup success", response.data);
            router.push('/login')
        } catch (error: any) {
            // console.log(toast.error);
            console.log(error.message)
        } finally {
            setLoading(false);
        }
        
    }

    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex-auto flex flex-col justify-center items-center">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <label>
                username
                <input 
                    type="text" 
                    value={user.username} 
                    onChange={(e) => {setUser({...user, username: e.target.value})}} 
                    placeholder="username" 
                    className="text-black"/>
            </label>
            <hr />
            <label>
                email
                <input 
                    type="email" 
                    value={user.email} 
                    onChange={(e) => {setUser({...user, email: e.target.value})}} 
                    placeholder="email" 
                    className="text-black"/>
            </label>
            <hr />
            <label>
                password
                <input 
                    type="password" 
                    value={user.password} 
                    onChange={(e) => {setUser({...user, password: e.target.value})}} 
                    placeholder="password" 
                    className="text-black"/>
            </label>
            <hr />
            <button onClick={onSignup}>
                {buttonDisabled ? "No Signup" : "Sign Up"}
            </button>
            <Link href="/login">Visit Login Page</Link>
        </div>
    )
}