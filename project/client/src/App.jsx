import React from "react";
import { Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/auth/*" element={<Auth />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
}
