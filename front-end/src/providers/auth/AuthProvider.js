import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
    const [token, setToken] = useState({
        id: 'teste',
    });
return (
    <AuthContext.Provider value={ { token, setToken} }>
        { props.children }
    </AuthContext.Provider>

)}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}