"use client"
import React from 'react'

export default function AuthLayout({ children }) {
    return (
        <div>
            <main>
                {children}
            </main>
        </div>
    );
}