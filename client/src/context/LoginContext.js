import { createContext, useContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
    const [loginStatus, setLoginStatus] = useState(false);

    return <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>{props.children}</LoginContext.Provider>;
};

export const useLoginContext = () =>{
    return useContext(LoginContext);
}