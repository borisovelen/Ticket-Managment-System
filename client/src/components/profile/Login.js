import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "./AuthForm.css"
import { useLoginContext } from "../../context/LoginContext";

function Login(){

    const navigate = useNavigate();
    const {loginStatus} = useLoginContext();

    useEffect(()=>{
        if(loginStatus) navigate("/");
    },[loginStatus])
    return(
        <div className="loginPage">
            <LoginForm />
        </div>
    )
}
export default Login;