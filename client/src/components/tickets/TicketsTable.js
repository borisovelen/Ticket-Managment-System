import React, { useEffect, useRef, useState } from "react";
import TicketItem from "./TicketItem";
import { useTicketListContext } from "../../context/TicketListContext";
import './TicketsTable.css';
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { useTicketCounterContext } from "../../context/TicketCounterContext";

function TicketsTable(props) {
    const ref = useRef();
    const { tickets } = useTicketListContext();
    const { counter, setCounter } = useTicketCounterContext();
    const [filteredTickets, setFilteredTickets] = useState([]);

    useEffect(() => {
        setFilteredTickets(props.filteredTickets);
    }, [props.filteredTickets])

    function scrollHandle() {
        const tableElement = ref.current;
        if (tableElement) {
            if (tableElement.scrollTop + tableElement.clientHeight >= tableElement.scrollHeight) {
                if (!counter.noMore) setCounter(prev => ({ ...prev, offset: prev.offset + 5 }));
            }
        }
    }


    function ticketItemComponent(ticket) {
        return (<TicketItem key={ticket.id} ticket={ticket} />);
    }

    function sortHandle(type, field) {
        setCounter(prev => ({ ...prev, offset: 0, limit: tickets.length, orderBy: field, orderType: type }));
    }

    return (
        <div id="ticketsTable" ref={ref} onScroll={scrollHandle}>
            <table >
                <thead>
                    <tr>
                        <th>ID <BiSolidUpArrow onClick={() => sortHandle("ASC", "id")} /><BiSolidDownArrow onClick={() => sortHandle("DESC", "id")} /></th>
                        <th>Short Description <BiSolidUpArrow onClick={() => sortHandle("ASC", "short_desc")} /><BiSolidDownArrow onClick={() => sortHandle("DESC", "short_desc")} /></th>
                        <th>Created By <BiSolidUpArrow onClick={() => sortHandle("ASC", "user")} /><BiSolidDownArrow onClick={() => sortHandle("DESC", "user")} /></th>
                        <th>Priority <BiSolidUpArrow onClick={() => sortHandle("ASC", "priority")} /><BiSolidDownArrow onClick={() => sortHandle("DESC", "priority")} /></th>
                        <th>State <BiSolidUpArrow onClick={() => sortHandle("ASC", "state")} /><BiSolidDownArrow onClick={() => sortHandle("DESC", "state")} /></th>
                        <th>Date Created <BiSolidUpArrow onClick={() => sortHandle("ASC", "created_on")} /><BiSolidDownArrow onClick={() => sortHandle("DESC", "created_on")} /></th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTickets.length === 0 ? <tr><td colSpan={7} style={{ textAlign: "center" }}>There are no items matching your current filter criteria!</td></tr> : filteredTickets.map((ticket) => ticketItemComponent(ticket))}
                    <tr>
                        <td colSpan={7} style={{ textAlign: "center", padding: "5px 0px", background: "var(--primary-color)", color: "white" }}>
                            {(counter.noMore ? <p>There is no more tickets to be loaded!</p> : <p>Scroll to load more tickets!</p>)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}
export default TicketsTable;