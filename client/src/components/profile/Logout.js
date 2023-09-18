import React from "react";
import { usersAPI } from '../../api';
import { useLoginContext } from '../../context/LoginContext';
import { useErrorContext } from '../../context/ErrorContext';
import { useSelectedTicketContext } from '../../context/selectedTicketContext';
import { useTicketCounterContext } from '../../context/TicketCounterContext';

function Logout(){
    const { setLoginStatus } = useLoginContext();
    const { setCounter } = useTicketCounterContext();
    const { setSelectedTicket } = useSelectedTicketContext();
    const { setError } = useErrorContext();

    async function logoutHandler() {
        await usersAPI.logout().then(response => {
            if (response.data === "Successfull logout!") {
                setSelectedTicket("");
                setLoginStatus(false);
                setError([response.data, "success"]);
                setCounter({ counter: 0, noMore: false });
            } else setError(["There was error on logout!", "error"])
        }).catch((err) => {
            if (err.response.status === 500) {
                setError([err.response?.data, "error"]);
            } else {
                setError(["Unsuccessfull logout! Contact system administrator!", "error"]);
            }
        });
    }

    return(
        <button className='userButton' type='button' onClick={logoutHandler}>Logout</button>
    )
}
export default Logout;