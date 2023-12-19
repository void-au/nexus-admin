"use client";

import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { ReactNode, useState } from "react";

export const Body = ({ children }: { children: ReactNode }) => {
    const { theme, switchTheme } = useTheme();

    return (
        <body className={theme}>
            {children}
        </body >
    )
}

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider>
            <Body>
                {children}
            </Body>
        </ThemeProvider>
    )
}
