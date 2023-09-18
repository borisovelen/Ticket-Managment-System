import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [profile, setProfile] = useState(null);

    return <UserContext.Provider value={{ profile, setProfile }}>{props.children}</UserContext.Provider>;
};

export const useUserContext = () =>{
    return useContext(UserContext);
}