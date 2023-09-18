import React, { useEffect } from 'react';
import "./Notification.css"
import { BiSolidError } from "react-icons/bi"
import { useErrorContext } from '../context/ErrorContext';
import { TiTick } from "react-icons/ti"

function Notification() {
    const { error, setError } = useErrorContext();
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    }, [error])
    if (error) {
        if (error[1] === "error") {
            return (
                <div className='notification'>
                    <p><BiSolidError /> {error[0]}</p>
                </div>
            )
        } else {
            return (
                <div className='notification notification_success'>
                    <p><TiTick /> {error[0]}</p>
                </div>
            )
        }
    }
}
export default Notification;