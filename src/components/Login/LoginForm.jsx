import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setUserInfo } from '../../store/userSlice'
import { userLogin } from "../../utils/apiService";

export const LoginForm = (props) => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (!userName.trim() || !password.trim()) {
            setMessage("All fields are required.");
            setIsLoading(false);
            return; // Stop execution
        }

        let payload = {
            username: userName,
            password: password
        }
        console.log("The user result::", payload)


        try {
            const response = await userLogin(payload);
            console.log("The login response", response)
            if (response?.access_token) {
                dispatch(setUserInfo(response)); // Pass full response
                props.handleClose();
                history("/");
            } else {
                setMessage("Login failed. Invalid response.");
            }
        } catch (error) {
            console.error("Error in logging user", error)
            setMessage(error?.response?.data?.detail ? error?.response?.data?.detail : error?.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(""), 2000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="form-auth-container">
            <h1>Login</h1>
            {/* login Message */}
            {message && <p style={{ color: 'white', fontFamily: 'Poppins' }}>{message}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="userName">UserName<span className="asterisk">*</span></label>
                <input type="text" onChange={(e) => setUserName(e.target.value)} className="userName" placeholder="Enter UserName" value={userName}></input>
                <label htmlFor="password">Password<span className="asterisk">*</span></label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="password" placeholder="Enter Password" value={password}></input>
                <button className="btn-submit" type="submit" disabled={isLoading}>{isLoading ? 'Loggin in' : 'Log In'}</button>
            </form>
            <button className="btn-link" onClick={() => props.onFormSwitch('register')}>Not a Registered User?? Register Here</button>
        </div>
    )
}