import { createContext, useContext, useState } from "react";

export const SelectedTicketContext = createContext();

export const SelectedTicketProvider = (props) => {
    const [selectedTicket, setSelectedTicket] = useState();

    return <SelectedTicketContext.Provider value={{ selectedTicket, setSelectedTicket }}>{props.children}</SelectedTicketContext.Provider>;
};

export const useSelectedTicketContext = () => {
    return useContext(SelectedTicketContext);
}