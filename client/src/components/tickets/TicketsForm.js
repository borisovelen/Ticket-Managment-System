import React, { useEffect, useState } from "react";
import { ticketsAPI } from "../../api";
import { useSelectedTicketContext } from "../../context/selectedTicketContext";
import { useErrorContext } from "../../context/ErrorContext";
import { useTicketListContext } from "../../context/TicketListContext";
import "./TicketsForm.css";
import { useTicketCounterContext } from "../../context/TicketCounterContext";

function TicketsForm() {
    const { setError } = useErrorContext();
    const { tickets } = useTicketListContext();
    const { selectedTicket, setSelectedTicket } = useSelectedTicketContext();
    const [id, setID] = useState(null);
    const [shortDesc, setShortDesc] = useState("");
    const [longDesc, setLongDesc] = useState("");
    const [state, setState] = useState("New");
    const [priority, setPriority] = useState("Low");
    const [jiraID, setJiraID] = useState(null);
    const [required, setRequired] = useState(false);
    const { counter, setCounter } = useTicketCounterContext();

    function setDefaultValues() {
        setID(null);
        setShortDesc("");
        setLongDesc("");
        setState("New");
        setPriority("Low");
        setJiraID(null);
    }

    useEffect(() => {
        if (selectedTicket.ticket === "New Ticket") {
            setDefaultValues();
        } else if (selectedTicket?.edit) {
            setID(selectedTicket?.ticket?.id);
            setShortDesc(selectedTicket?.ticket?.shortDesc);
            setLongDesc(selectedTicket?.ticket?.description);
            setState(selectedTicket?.ticket?.state);
            setPriority(selectedTicket?.ticket?.priority);
            setJiraID(selectedTicket?.ticket?.jira_id);
        }
    }, [selectedTicket]);

    function clearHandler() {
        if (selectedTicket?.ticket === "New Ticket") {
            setDefaultValues();
            setRequired(false);
        } else setSelectedTicket({ ticket: "New Ticket", edit: true });
    }

    function ticketsLoader(type) {
        if (counter.noMore && type === "add") {
            setCounter(prev => ({ ...prev, limit: tickets.length + 1, offset: 0, update: prev.update + 1 }));
        } else if (type === "add") {
            setCounter(prev => ({ ...prev, offset: 0, update: prev.update + 1 }));
        } else if (type === "update") {
            setCounter(prev => ({ ...prev, limit: tickets.length, offset: 0, update: prev.update + 1 }));
        }
    }

    async function addTicketHandler(e) {
        e.preventDefault();
        if (shortDesc === "") {
            setRequired(true);
            setError(["Short Description field is required!", "error"]);
        } else {
            await ticketsAPI.addTicket({
                shortDesc: shortDesc,
                description: longDesc,
                state: state,
                priority: priority,
            }).then((response) => {
                setError([response.data, "success"]);
                ticketsLoader("add");
                clearHandler();
            }).catch(err => {
                if (err.response.status === 403 || err.response.status === 406 || err.response.status === 500) {
                    setError([err.response?.data, "error"]);
                } else setError(["You can't add new ticket right now. Contact system administrator!", "error"]);
            });

        }
    }
    async function updateTicketHandler(e) {
        e.preventDefault();
        if (shortDesc === "") {
            setRequired(true);
            setError(["Short Description field is required!", "error"]);
        } else {
            await ticketsAPI.updateTicket({
                id: id,
                shortDesc: shortDesc,
                description: longDesc,
                state: state,
                priority: priority,
                jira_id: jiraID
            }).then((response) => {
                setError([response.data, "success"]);
                ticketsLoader("update");
                clearHandler();
            }).catch(err => {
                if (err.response.status === 403 || err.response.status === 401 || err.response.status === 406 || err.response.status === 500 || err.response.status === 400) {
                    setError([err.response?.data, "error"]);
                } else setError(["You can't update this ticket right now! Contatct system administrator!", "error"]);
            });
        }
    }
    useEffect(() => {
        const el = document.querySelector("#shortDesc");
        if (required) {
            el.style.borderBottom = "5px solid rgba(255, 0, 0, 0.5)"
        } else el.style.borderBottom = "5px solid rgba(255,255,255,0.2)";
    }, [required])

    return (
        <form className="tickets-form" onSubmit={(id === null) ? addTicketHandler : updateTicketHandler}>
            <h1>{(id === null) ? "Add Ticket" : "Update Ticket"}</h1>
            <label htmlFor="id" hidden>ID: </label>
            <input type="number" id="id" name="id" hidden defaultValue={(id === null) ? "0" : id} />
            <label htmlFor="shortDesc">Short Description (*): </label>
            <input type="text" placeholder="Short Description" id="shortDesc" name="shortDesc" onChange={(e) => {
                if (e.target.value === "") setRequired(true);
                else setRequired(false);
                setShortDesc(e.target.value);
            }} value={shortDesc} />
            <label htmlFor="longDesc">Description: </label>
            <textarea type="textbox" rows="5" id="longDesc" placeholder="Description" name="longDesc" onChange={(e) => setLongDesc(e.target.value)} value={longDesc} />
            <label htmlFor="state">State: </label>
            <select name="state" id="state" onChange={(e) => setState(e.target.value)} value={state} disabled={id === null} style={(id === null) ? { cursor: "not-allowed" } : {}}>
                <option value="New">State: New</option>
                <option value="In progress">State: In Progress</option>
                <option value="Review">State: Review</option>
                <option value="Done">State: Done</option>
            </select>
            <label htmlFor="priority">Priority: </label>
            <select name="priority" id="priority" onChange={(e) => setPriority(e.target.value)} value={priority}>
                <option value="Low">Priority: Low</option>
                <option value="Moderate">Priority: Moderate</option>
                <option value="High">Priority: High</option>
                <option value="Critical">Priority: Critical</option>
            </select>
            <span>
                <button type="submit">{(id === null) ? "Add Ticket" : "Update Ticket"}</button>
                <button type="button" onClick={clearHandler}>Clear</button>
            </span>
        </form>
    )
}
export default TicketsForm;