import React, { useEffect, useState } from "react";
import { useSelectedTicketContext } from "../../context/selectedTicketContext";
import { ticketsAPI } from "../../api";
import { useTicketListContext } from "../../context/TicketListContext";
import { useErrorContext } from "../../context/ErrorContext";
import { MdDelete, MdEdit } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useTicketCounterContext } from "../../context/TicketCounterContext";

function TicketItem(props) {
    const { setError } = useErrorContext();
    const { tickets } = useTicketListContext();
    const { selectedTicket, setSelectedTicket } = useSelectedTicketContext();
    const { setCounter } = useTicketCounterContext();
    const [ticket, setTicket] = useState();
    const [deleting,setDeleting] = useState("");

    useEffect(() => {
        if (props.ticket) setTicket(props.ticket);
    }, [props.ticket])

    async function deleteHandler(id,jira_id) {
        await ticketsAPI.deleteTicket(id, jira_id).then(response => {
            setDeleting("deleting");
            console.log(tickets.length);
            setCounter(prev=>({...prev,limit:tickets.length,offset:0,update:prev.update+1}));
            setError([response.data, "success"]);
            if (selectedTicket?.ticket?.id === id) {
                setSelectedTicket({ ticket: "New Ticket", edit: true });
            }
        })
            .catch(err => {
                if (err.response.status === 401 || err.response.status === 404 || err.response.status === 500) {
                    setError([err.response.data, "error"]);
                } else setError("Unexpected error!");
            });
    }

    if (ticket) {
        return (
            <tr className={deleting}>
                <td>{ticket.id}</td>
                <td>{ticket.shortDesc}</td>
                <td>{ticket.createdBy}</td>
                <td><p className={"priority priority_" + ticket.priority}>{ticket.priority}</p></td>
                <td>{ticket.state}</td>
                <td>{new Date(ticket.createdOn).toLocaleDateString("en-EN", {day:'numeric',month:"numeric",year:'numeric'})}</td>
                <td className="options">
                    <MdDelete title="Delete Ticket" onClick={() => deleteHandler(ticket.id, ticket.jira_id)} className='optionButton' />
                    <MdEdit title="Edit Ticket" onClick={() => setSelectedTicket({ ticket, edit: true })} className='optionButton' />
                    <AiOutlineArrowRight title="Show more details" onClick={() => setSelectedTicket({ ticket, edit: false })} id="selectButton" className="optionButton" />
                </td>
            </tr>
        );
    }
}
export default TicketItem;