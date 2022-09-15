import { createContext, useState } from "react";

/**
 * Module Name: AuthProvider.js 
 * Date of Creation: 03/09/2022
 * Creator: Hao Xu
 * Summary: global component for auth.
 * Variable Accessed: 
 */

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;