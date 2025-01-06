"use client";
import axios from "axios";
import React from "react";
import Link from "next/link";
// import Router from "next/navigation";

export default function verifyEmailPage() {
    const [token, setToken] = React.useState('');
    const [message, setMessage] = React.useState('Verifing');

    async function verifyEmail() {
        try {
            const response = await axios.post('/api/users/verifyemail', {token});
            if (response.data.status !== 200) {
                console.log(response.data);
                throw "error"
            }
            setMessage("Verified");
        } catch (error: any) {
            console.log(error.message);
            setMessage("Error Occurred");
        }
    }

    React.useEffect(() => {
        const url = window.location.search.split("=")[1];
        setToken(url || '');
    }, [])
    React.useEffect(() => {
        if (token.length > 0) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    )

}