import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Auth } from "./components/Auth";
import { Error } from "./components/Error";

export default function App() {
    return (
        <>
            <AuthProvider>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Navigate to="/auth/login" />}
                    >
                        {" "}
                    </Route>
                    <Route path="/auth/*" element={<Auth />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </AuthProvider>
        </>
    );
}
