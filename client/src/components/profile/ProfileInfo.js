import React from 'react'
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useLoginContext } from '../../context/LoginContext';
import { useUserContext } from '../../context/UserContext';
import Logout from './Logout';
import DarkMode from './DarkMode';

function ProfileInfo() {
    const { loginStatus } = useLoginContext();
    const { profile } = useUserContext();
    const navigate = useNavigate();

    
    const profileInfo = (
        <div className='profileInfo'>
            <p onClick={() => navigate('/profile')} style={{cursor:"pointer" ,marginRight:"10px"}}>{profile?.name}</p>
            <Logout />
        </div>
    );

    return (
        <>
        <DarkMode />
            {loginStatus ? profileInfo : ((window.location.pathname === '/login' || window.location.pathname === '/register') ? <></> : <><LoginForm /><button type='button' onClick={() => navigate('/register')} className="userButton">Sign Up</button></>)}
            
        </>
    );
}
export default ProfileInfo;