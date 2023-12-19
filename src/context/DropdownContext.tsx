"use client"

import { createContext, useContext, useState } from "react";
import { uuid } from "uuidv4";


export interface DropdownContextType {
    register_open: () => string;
    current_open: string;
}

const DropdownContext = createContext<DropdownContextType>(null!);

export const DropdownProvider = ({ children }: { children: React.ReactNode }) => {
    const [current, setCurrent] = useState<string>(null!);

    const register_open = () => {
        const id = uuid();
        setCurrent(id);
        return id;
    }

    return (
        <DropdownContext.Provider value={{ register_open, current_open: current }}>
            {children}
        </DropdownContext.Provider>
    )
}

export const useDropdown = () => {
    const context = useContext(DropdownContext);
    if (context === undefined) {
        throw new Error('useDropdown must be used within a DropdownProvider')
    }
    return context;
}