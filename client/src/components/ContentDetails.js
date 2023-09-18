import React, { useEffect, useState } from "react";
import "./ContentDetails.css";
import TicketsForm from "./tickets/TicketsForm";
import { useSelectedTicketContext } from "../context/selectedTicketContext";
import TicketDetails from "./tickets/TicketDetails";

function ContentDetails() {
    const { selectedTicket,setSelectedTicket } = useSelectedTicketContext();
    const [showIt, setShowIt] = useState(false);

    useEffect(() => {
        if (selectedTicket?.id === null || selectedTicket === "") {
            setShowIt(false);
        } else setShowIt(true);
    }, [selectedTicket])
    useEffect(()=>{
        if(!showIt){
            setSelectedTicket("");
        }
    },[showIt])
    
    return (
        <div className="contentDetails" style={{ display: (showIt ? "block" : "none") }}>
            <div onClick={()=>setShowIt(false)} className="close-container">
                <div className="leftright"></div>
                <div className="rightleft"></div>
                <label className="close">close</label>
            </div>
            {(selectedTicket?.edit)?<TicketsForm />:<TicketDetails/>}
            
        </div>
    )
}
export default ContentDetails;