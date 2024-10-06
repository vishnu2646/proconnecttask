import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext();

export const TokenContextProvider = ({ children }) => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || null);

    const updateToken = (token) => {
        setToken(token);
    }

    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token));
    }, [token]);

    return <TokenContext.Provider value={{ token, updateToken }}>{children}</TokenContext.Provider>
}