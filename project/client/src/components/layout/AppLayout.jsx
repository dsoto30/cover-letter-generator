import { Routes, Route, Navigate } from "react-router-dom";
import NavbarLayout from "./NavbarLayout";
import Home from "./Home";
import { Error } from "./Error";
import { Auth } from "../auth/Auth";
import { selectUser } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import React from "react";

function AppLayout() {
    const user = useSelector(selectUser);
    return (
        <>
            <NavbarLayout />
            <Routes>
                <Route
                    path="/"
                    element={user ? <Navigate to="/auth/profile" /> : <Home />}
                />
                <Route path="/auth/*" element={<Auth />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
}

export default AppLayout;
