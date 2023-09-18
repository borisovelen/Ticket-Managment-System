import { createContext, useContext, useState } from "react";

export const TicketCounterContext = createContext();

export const TicketCounterProvider = (props) => {
    const [counter, setCounter] = useState({noMore:false, limit:5, offset:0, orderType:"ASC", orderBy:"id",update:0});

    return <TicketCounterContext.Provider value={{ counter, setCounter }}>{props.children}</TicketCounterContext.Provider>;
};

export const useTicketCounterContext = () => {
    return useContext(TicketCounterContext);
}