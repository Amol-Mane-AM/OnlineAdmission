import { createContext, useState } from "react";

export const ThemeContext = createContext();

function ThemeProvider(props) {
    const [user, setUser] = useState(null);

    const login = (username) => {
        setUser({ username });
        console.log(username);

    }

    const logout = () => {
        setUser(null);
    };

    return (
        <>
            <ThemeContext.Provider value={{ user, login, logout }}>
                {props.children}
            </ThemeContext.Provider>
        </>
    )
}

export default ThemeProvider;