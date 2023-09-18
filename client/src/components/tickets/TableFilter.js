import React, { useEffect, useState } from "react";
import { useTicketListContext } from "../../context/TicketListContext";

function TableFilter(props) {
    const { tickets } = useTicketListContext();
    const [filter, setFilter] = useState({
        id: '',
        shortDesc: '',
        createdBy: '',
        priority: '',
        state: '',
        createdOn: '',
    });

    function setFilterHandler(e) {
        setFilter(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    function clearFilterHandler() {
        setFilter({
            id: '',
            shortDesc: '',
            createdBy: '',
            priority: '',
            state: '',
            createdOn: '',
        });
        document.querySelector(".table-filter").reset();;
    }

    useEffect(() => {
        if (Array.isArray(tickets)) {
            props.setFiltered(tickets.filter((ticket) => {
                let id = true;
                let shortDesc = true;
                let createdBy = true;
                let priority = true;
                let state = true;
                let createdOn = true;
                if (filter.id !== '') id = ticket.id === Number(filter.id);
                if (filter.shortDesc !== '') shortDesc = RegExp('(' + filter.shortDesc + ')+', 'gi').test(ticket.shortDesc);
                if (filter.createdBy !== '') createdBy = RegExp('(' + filter.createdBy + ')+', 'gi').test(ticket.createdBy);
                if (filter.priority !== '') priority = ticket.priority === filter.priority;
                if (filter.state !== '') state = ticket.state === filter.state;
                if (filter.createdOn !== '') createdOn = ticket.createdOn.toString().split('T')[0] === filter.createdOn;
                return id && shortDesc && createdBy && priority && state && createdOn;
            }));
        }
    }, [filter, tickets]);

    return (
        <form className="table-filter">
            <input name="id" type="number" onChange={(e) => setFilterHandler(e)} placeholder="Search by ID" />
            <input name="shortDesc" type="text" onChange={(e) => setFilterHandler(e)} placeholder="Search by Description" />
            <input name="createdBy" type="text" onChange={(e) => setFilterHandler(e)} placeholder="Search by Creator" />
            <select title="Search by Priority" name="priority" id="priority" onChange={(e) => setFilterHandler(e)}>
                <option value="">Search by Priority</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
            </select>
            <select title="Search by State" name="state" onChange={(e) => setFilterHandler(e)}>
                <option value="">Search by State</option>
                <option value="New">New</option>
                <option value="In progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Done">Done</option>
            </select>
            <input name="createdOn" type="text" onChange={(e) => setFilterHandler(e)} placeholder="Search by Date" onFocus={(e)=>e.target.type='date'} onBlur={(e)=>e.target.type='text'}/>
            <button type="button" onClick={clearFilterHandler}>Clear Filter</button>
        </form>
    )
}
export default TableFilter;