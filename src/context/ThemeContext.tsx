import { createContext, useContext, useState } from "react";

const DEF_THEME = 'light';

export interface ThemeContextType {
    theme: string;
    switchTheme: (theme: string) => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType>(null!);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState(DEF_THEME);

    const switchTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, switchTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context;
}