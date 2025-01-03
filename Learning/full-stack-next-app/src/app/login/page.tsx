"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";

export default function LoginPage() {

    const [user, setUser] = React.useState({
        email: "", 
        password: "", 
    })
    const [loading, setLoading] = React.useState(false)
    const [disabledButton, setDisabledButton] = React.useState(false)
    const router = useRouter()

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            if (response.data.status !== 200) {
                throw response.data;
            }
            console.log("Login success", response.data);
            router.push('/profile')
        } catch (err: any) {
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [user])

    return (
        <div className="flex-auto flex flex-col justify-center items-center">
            <h1>Login</h1>
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
            <button onClick={onLogin}>
                {disabledButton ? "No Login" : "Login"}
            </button>
            <Link href="/signup">Visit Signup Page</Link>
        </div>
    )
}