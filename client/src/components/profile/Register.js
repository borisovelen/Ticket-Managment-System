import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import "./AuthForm.css";
import { useLoginContext } from "../../context/LoginContext";
import RegisterForm from "./RegisterForm";

function Register() {

    const navigate = useNavigate();
    const {loginStatus} = useLoginContext();

    useEffect(()=>{
        if(loginStatus) navigate("/");
    },[loginStatus]);

    return (
        <div className="registerPage"><RegisterForm /></div>
    )
}
export default Register;