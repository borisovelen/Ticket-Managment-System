import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLoginContext } from '../../context/LoginContext';
import { useErrorContext } from '../../context/ErrorContext';
import { usersAPI } from '../../api';


function LoginForm() {
    const navigate = useNavigate();
    const {loginStatus, setLoginStatus} = useLoginContext();
    const {setError} = useErrorContext();

    async function loginHandler(e) {
        e.preventDefault();
        usersAPI.login(document.querySelector('.authForm'))
        .then((response)=>{
            setError([response.data,"success"]);
            setLoginStatus(true);
        })
        .catch(err=>{
            setLoginStatus(false);
            setError([err.response?.data, "error"]);
        });
        document.querySelector('.authForm').reset();
    }
    const loginForm = (
        <form className='authForm' onSubmit={loginHandler}>
            <h2 className="formTitle">Login</h2>
            <span>
            <input name='email' id='email' type='text' placeholder='E-Mail' autoComplete='email'/>
            <input name='password' id='password' type='password' placeholder='Password' autoComplete='current-password'/>
            <button className='primaryButton' type='submit' >Login</button>
            <a onClick={()=>navigate("/register")}>You don't have an account? Register now!</a>
            </span>
        </form>
    );
    
    return (
        <>{loginStatus ? <></>: loginForm}</> 
    );
}

export default LoginForm;