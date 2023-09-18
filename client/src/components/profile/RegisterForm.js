import React from "react";
import { useErrorContext } from "../../context/ErrorContext";
import { useNavigate } from "react-router-dom";
import { usersAPI } from "../../api";


function RegisterForm(){

    const navigate = useNavigate();
    const {setError} = useErrorContext();

    async function registerHandler(e) {
        e.preventDefault();
        usersAPI.register(document.querySelector('.authForm'))
        .then(response => {
            setTimeout(() => navigate('/login'), 5000);
            setError([response.data + " Redirecting to the login page...", "success"])
        }).catch(err=>{
            setError([err.response.data, "error"]);
        })
        document.querySelector('.authForm').reset();
    }

    return(
        <form className='authForm' onSubmit={registerHandler}>
            <h2 className="formTitle">Register</h2>
            <span>
                <input name="fname" id="fname" type="text" placeholder="First Name" autoComplete="given-name"/>
                <input name="lname" id="lname" type="text" placeholder="Last Name" autoComplete="family-name"/>
                <input name='email' id='email-register' type='text' placeholder='E-Mail' autoComplete="email"/>
                <input name='password' id='password-register' type='password' placeholder='Password' autoComplete="current-password"/>
                <button className='primaryButton' type='submit'>Register</button>
                <a onClick={() => navigate("/login")}>You already have an account? Login</a>
            </span>
        </form>
    )
}
export default RegisterForm;