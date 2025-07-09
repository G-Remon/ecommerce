import { createContext, useState } from "react";
import { Navigate } from "react-router";

export const TokenContext = createContext(null);
export default function TokenProvider({ children }) {


    const [token, setToken] = useState(localStorage.getItem('token'))
    function logout() {
        setToken(null)
        localStorage.removeItem('token')
    }

    return <TokenContext.Provider value={{ token, setToken, logout }}>
        {children}
    </TokenContext.Provider>
}

