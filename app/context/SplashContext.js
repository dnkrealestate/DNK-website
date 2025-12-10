"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SplashContext = createContext();

export const SplashProvider = ({ children }) => {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 60);

        return () => clearTimeout(timer);
    }, []);

    return (
        <SplashContext.Provider value={{ showSplash }}>
            {children}
        </SplashContext.Provider>
    );
};

export const useSplash = () => useContext(SplashContext);
