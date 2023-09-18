import React, { useState } from "react";
import { usersAPI } from '../../api';
import { useLoginContext } from '../../context/LoginContext';
import { useErrorContext } from '../../context/ErrorContext';
import { useSelectedTicketContext } from '../../context/selectedTicketContext';
import { useTicketCounterContext } from '../../context/TicketCounterContext';
import Modal from "react-overlays/Modal";


function DeleteProfile() {
    const { setLoginStatus } = useLoginContext();
    const { setCounter } = useTicketCounterContext();
    const { setSelectedTicket } = useSelectedTicketContext();
    const { setError } = useErrorContext();
    const [password,setPassword] = useState("");
    const renderBackdrop = (props) => <div className="backdrop" {...props} />;
    const [showModal, setShowModal] = useState(false);
    const [showPassForm,setShowPassForm] = useState(false);
    
    async function handleDelete(){
        await usersAPI.delete({password:password}).then(response => {
            if (response.data === "You have successfully deleted your account!") {
                setSelectedTicket("");
                setLoginStatus(false);
                setError([response.data, "success"]);
                setCounter(prev=>({...prev, noMore: false }));
            } else setError(["There was error on logout!", "error"])
        }).catch((err) => {
            if (err.response.status === 500 || err.response.status === 403 || err.response.status === 401) {
                setError([err.response?.data, "error"]);
            } else {
                setError(["Unsuccessfull logout! Contact system administrator!", "error"]);
            }
        });
    }

    function handleClose(){
        setShowPassForm(false);
        setShowModal(false);
    }

    return (
        <>
            <button className='userButton' type='button' onClick={() => setShowModal(true)}>Delete profile</button>
            <Modal className="hide" show={showModal} onHide={handleClose} backdrop={renderBackdrop}>
                <div className="modal">
                    <div className="modal-header">
                        <div className="modal-title">Delete Account</div>
                        <div>
                            <span className="close-button" onClick={handleClose}>
                                x
                            </span>
                        </div>
                    </div>
                    <div className="modal-desc">
                        {!showPassForm?<p>Are you sure you want to delete your account?</p>:<><label htmlFor="password">Enter your password to delete your account: </label><input name="password" type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" /></>}
                    </div>
                    <div className="modal-footer">
                        <button className="userButton secondary-button" onClick={handleClose}>
                            Cancel
                        </button>
                        <button className="userButton" onClick={(e)=>{
                            if(showPassForm){
                                handleDelete();
                            }else setShowPassForm(true);
                        }}>
                            Delete profile
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default DeleteProfile;