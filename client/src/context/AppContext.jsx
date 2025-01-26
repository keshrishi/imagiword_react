import { createContext, useState } from "react";

// Create the context
export const AppContext = createContext();

// Provider component to wrap the app
const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);  // Default value could be null to represent no user initially
    const [showLogin,setShowLogin] = useState(false);
    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
