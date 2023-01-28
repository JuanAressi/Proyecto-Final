import {createContext, useState} from 'react';

const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser]         = useState(null);
    const [nombre, setNombre]     = useState(null);
    const [apellido, setApellido] = useState(null);
    const [role, setRole]         = useState(null);

    return (
        <userContext.Provider
            value={{
                user,
                nombre,
                apellido,
                role,
                setUser,
                setNombre,
                setApellido,
                setRole,
            }}
        >
            {children}
        </userContext.Provider>
    );
}

export default userContext;