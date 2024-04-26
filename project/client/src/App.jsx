import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Error } from "./pages/Error";

export default function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Navigate to="auth/login" />}>
                    {" "}
                </Route>
                <Route path="/auth/*" element={<Auth />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
}
