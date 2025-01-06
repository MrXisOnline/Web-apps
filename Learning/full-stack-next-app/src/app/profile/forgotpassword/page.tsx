"use client";
import axios from "axios";
import React from "react";

export default function ForgotPassword(){
    const [token, setToken] = React.useState('');
    const [newPass, setNewPass] = React.useState('');
    const [showFields, setShowFields] = React.useState(false);

    async function sendToken() {
        try {
            const response = await axios.post('/api/users/forgotpassword', {token});
            if (response.data.status !== 200) {
                console.log(response.data)
                console.log('error throw')
                throw "error"
            }
            console.log('token accepted');
            setShowFields(true);
        } catch (error: any) {
            console.log('error');
        }
    }
    async function setPassword() {
        try {
            const response = await axios.post('/api/users/setpassword', {newPass});
            if (response.data.status !== 200) {
                console.log('unable to change')
            }
            console.log("password changed");
            setShowFields(false);
        } catch (error) {
            console.log('error');
        }
    }

    React.useEffect(() => {
        let fToken = window.location.search.split('=')[1];
        setToken(fToken);
    }, [])
    React.useEffect(() => {
        if (token.length > 0) {
            sendToken();
        }
    }, [token])

    return (
        <div>
            {showFields && 
                <div>
                    <label>New Password
                        <input className="text-black" type="password" name="password" value={newPass} onChange={(e) => {setNewPass(e.target.value)}}/>
                    </label>
                    <button onClick={setPassword}>Set</button>
                </div>
            }
        </div>
    )
}