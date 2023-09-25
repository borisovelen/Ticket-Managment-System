import React from 'react'
import ProfileInfo from './profile/ProfileInfo';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useSelectedTicketContext } from '../context/selectedTicketContext';
import { useLoginContext } from '../context/LoginContext';

function Header() {
    const navigate = useNavigate();
    const { setSelectedTicket } = useSelectedTicketContext();
    const { loginStatus } = useLoginContext();
    return (
        <div className="header">
            <div onClick={() => navigate('/')} className="logo">
                <img alt='logo' src='/images/logo.png' />
                <h1>'s Tickets Manager</h1>
            </div>
            <div className='nav'>
                <p className='navigation' onClick={() => navigate('/')}>Tickets</p>
                {loginStatus ? <p className='navigation' onClick={() => setSelectedTicket({ ticket: "New Ticket", edit: true })}>Add Ticket</p> : <></>}
                {loginStatus ? <p className='navigation' onClick={() => navigate('/profile')}>Profile</p> : <></>}
                {!loginStatus? <p className='navigation' onClick={() => navigate('/register')}>Sign Up</p>:<></>}
                {!loginStatus? <p className='navigation' onClick={() => navigate('/login')}>Login</p>: <></>}
            </div>
            {(window.location.pathname === '/login' || window.location.pathname === '/register') ? <div style={{ display: "none" }} className='profile'><ProfileInfo /></div> : <div className='profile'><ProfileInfo /></div>}
        </div>
    );
}
export default Header;