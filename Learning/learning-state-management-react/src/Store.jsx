import React from "react";

export const Users = React.createContext([])

export const UserProvider = ({children}) => {
    const [users, setUsers] = React.useState([]);
    return (
        <Users.Provider value={{users, setUsers}}>
            {children}
        </Users.Provider>
    )
}

