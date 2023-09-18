import { createContext, useContext, useState } from "react";

export const TicketListContext = createContext();

export const TicketListProvider = (props) => {
    const [tickets, setTickets] = useState([]);

    return <TicketListContext.Provider value={{ tickets, setTickets }}>{props.children}</TicketListContext.Provider>;
};

export const useTicketListContext = () => {
    return useContext(TicketListContext);
}