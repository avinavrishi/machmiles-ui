import { useState } from "react"
import { LoginForm } from "./LoginForm";
import { SignUp } from "./SignUp";
import './login.css'

const Login = ({handleClose}) => {
    const [currentState, setCurrentState] = useState('login');

    const toggleForm = (formName) => {
        setCurrentState(formName);
    }
    return (
        <div className="login-container">
            {
                currentState === 'login' ? <LoginForm onFormSwitch={toggleForm} handleClose={handleClose}/>:<SignUp onFormSwitch={toggleForm}/>
            }
        </div>
    )
}
export default Login