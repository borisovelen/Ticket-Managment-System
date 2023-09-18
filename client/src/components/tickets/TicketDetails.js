import React from "react";
import { useSelectedTicketContext } from "../../context/selectedTicketContext";
import './TicketDetails.css';

function TicketDetails() {
    const { selectedTicket } = useSelectedTicketContext();
    return (
        <div className="ticket-details">
            <h2 id="ticket-title">{selectedTicket?.ticket?.shortDesc}</h2>
            <span className="user-info">
                <p><span>Created on:</span> {new Date(selectedTicket?.ticket?.createdOn).toLocaleDateString("en-EN", { day: 'numeric', month: "long", year: 'numeric', hour: 'numeric', minute: 'numeric' })} ({Math.floor(new Date().toLocaleDateString("en-EN", { day: 'numeric' }) - new Date(selectedTicket?.ticket?.createdOn).toLocaleDateString("en-EN", { day: 'numeric' }))} days ago)</p>
                <p><span>by:</span> {selectedTicket?.ticket?.createdBy}</p>
            </span>
            <span className="sections">
                <h4>Description: </h4>
                <p id="description-text-box">{selectedTicket?.ticket?.description}</p>
            </span>
            <span className="sections">
                <h4>Priority: </h4>
                <p>{selectedTicket?.ticket?.priority}</p>
            </span>
            <span className="sections">
                <h4>State: </h4>
                <p>{selectedTicket?.ticket?.state}</p>
            </span>
            {
                (selectedTicket?.ticket?.updatedBy)
                    ?
                    <span className="user-info">
                        <p><span>Updated on:</span> {new Date(selectedTicket?.ticket?.updatedOn).toLocaleDateString("en-EN", { day: 'numeric', month: "long", year: 'numeric', hour: 'numeric', minute: 'numeric' })} ({Math.floor(new Date().toLocaleDateString("en-EN", { day: 'numeric' }) - new Date(selectedTicket?.ticket?.updatedOn).toLocaleDateString("en-EN", { day: 'numeric' }))} days ago)</p>
                        <p><span>by:</span> {selectedTicket?.ticket?.updatedBy}</p>
                    </span>
                    :
                    <></>
            }
        </div>
    )
}
export default TicketDetails;