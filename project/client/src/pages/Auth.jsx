import { Register } from "./Register";
import { Login } from "./Login";
import { Routes, Route } from "react-router-dom";

export function Auth() {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Routes>
    );
}
