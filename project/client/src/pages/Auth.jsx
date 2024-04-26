import { Register } from "./Register";
import { Login } from "./Login";
import { Profile } from "./Profile";
import { AuthProvider } from "./AuthContext";
import { Routes, Route } from "react-router-dom";
import React from "react";

export function Auth() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<Profile />} />
            </Routes>
        </AuthProvider>
    );
}
