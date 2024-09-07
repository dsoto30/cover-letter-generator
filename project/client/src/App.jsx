import React from "react";
import AppLayout from "./components/layout/AppLayout";
import { AuthProvider } from "./components/auth/AuthContext";

export default function App() {
    return (
        <>
            <AuthProvider>
                <AppLayout />
            </AuthProvider>
        </>
    );
}
