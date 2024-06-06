import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice";

export function PrivateRoute({ children }) {
    const user = useSelector(selectUser);
    if (user) {
        return children;
    }

    return <Navigate to={"/"} />;
}
