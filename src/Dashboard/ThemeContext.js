import { children,createContext } from "react";
import { useState } from "react";

export const ThemeContext = createContext();

function ThemeProvider(props) {
    // const theme = {
    //     color: "black",
    //     backgroundColor: "white",
    //     fontSize: "16px",
    //     padding: "10px",
    // };

    const [theme, setTheme] = useState('light');

    return (
        <ThemeContext.Provider value={{theme,setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    );
}

 export default ThemeProvider;