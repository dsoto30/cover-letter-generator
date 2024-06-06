import { Register } from "./Register";
import { Login } from "./Login";
import { Profile } from "../Profile";
import { PrivateRoute } from "./PrivateRoute";
import { Routes, Route } from "react-router-dom";
import React from "react";

export function Auth() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
                path="profile"
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}
