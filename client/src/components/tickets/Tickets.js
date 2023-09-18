import React, { useEffect, useState } from 'react'
import "./Tickets.css";
import TicketsTable from './TicketsTable';
import { ticketsAPI } from '../../api';
import { useLoginContext } from '../../context/LoginContext';
import { useErrorContext } from '../../context/ErrorContext';
import { useTicketListContext } from '../../context/TicketListContext';
import { useTicketCounterContext } from '../../context/TicketCounterContext';
import TableFilter from './TableFilter';

export default function Tickets() {

    const { tickets, setTickets } = useTicketListContext();
    const { loginStatus } = useLoginContext();
    const { setError } = useErrorContext();
    const { counter, setCounter } = useTicketCounterContext();
    const [filteredTickets, setFilteredTickets] = useState([]);

    async function ticketsLoaderHandler() {
        if (loginStatus) {
            await ticketsAPI.ticketsLoader({ counter }).then(response => {
                if (typeof response.data === "string") {
                    if (response.data === "There are no tickets!" || response.data === "You don't have any tickets!") {
                        if (!Array.isArray(tickets)) {
                            setTickets(response.data);
                        }
                        setCounter(prev => ({ ...prev, noMore: true }));
                    }
                    if (!loginStatus) setTickets(response.data);
                } else {
                    if (typeof tickets === "string") {
                        setTickets(response.data);
                    } else {
                        if (JSON.stringify(tickets) !== JSON.stringify(response.data)) {
                            if (counter.offset === 0) {
                                setTickets(response.data);
                            } else {
                                const newTickets = [...tickets, ...response.data];
                                setTickets(newTickets);
                            }
                            if (response.data?.length < 5) {
                                setCounter(prev => ({ ...prev, noMore: true }));
                            }
                        }

                    }
                }
            }).catch(err => setError([err, "error"]));
        } else setTickets("You have to be logged in to see the tickets!");
    }

    useEffect(() => {
        ticketsLoaderHandler();
    },[counter.limit,counter.offset,counter.orderBy,counter.orderType, counter.update,loginStatus]);
    useEffect(()=>{
        if(typeof tickets!=="string"&&tickets.length%5!==0){
            setCounter(prev=>({...prev,noMore:true}));
        }
    },[tickets])

    return (
        <div className='ticketsPage'>
            {loginStatus && Array.isArray(tickets) ? <TableFilter setFiltered={setFilteredTickets} /> : <></>}
            {(!Array.isArray(tickets)) ? (<p>{tickets}</p>) : ((tickets.length === 0) ? (<p>Loading...</p>) : <TicketsTable filteredTickets={filteredTickets} />)}
        </div>
    );
}