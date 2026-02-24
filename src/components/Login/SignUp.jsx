import React, { useEffect, useState } from "react";
import { registerUser } from "../../utils/apiService";

export const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true)

        if (!userName.trim() || !password.trim() || !email.trim()) {
            setMessage("All fields are required.");
            setIsLoading(false);
            return; // Stop execution
        }

        let payload = {
            username: userName,
            password: password,
            email: email
        }

        try {
            const response = await registerUser(payload);
            console.log("The response for final", response)
            setMessage("User Registered Successfully")
            setTimeout(()=>{
                props.onFormSwitch('login')
            },2000)
        } catch (error) {
            console.error("Error", error)
            setMessage("Error in registering user. Please try again later.")
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        const timer = setTimeout(()=>setMessage(""), 2000)
        return () =>clearTimeout(timer)
    },[message])

    return (
        <div className="form-auth-container-reg">
            <h1>Register</h1>
            {message && <p style={{color:'white', fontFamily:'Poppins'}}>{message}</p>}
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">UserName<span className="asterisk">*</span></label>
                <input type="text" onChange={(e) => setUserName(e.target.value)} className="name" placeholder="Enter your Name" value={userName}></input>
                <label htmlFor="email">Email<span className="asterisk">*</span></label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} className="email" placeholder="Enter Email ID" value={email}></input>
                <label htmlFor="password">Password<span className="asterisk">*</span></label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="password" placeholder="Enter Password" value={password}></input>
                <button className="btn-submit" disabled={isLoading ? true : false} type="submit" >{isLoading ? '...Processing' : 'Register'}</button>
            </form>
            <button className="btn-link" onClick={() => props.onFormSwitch('login')}>Already a Registered User?? Login Here</button>
        </div>
    )
}