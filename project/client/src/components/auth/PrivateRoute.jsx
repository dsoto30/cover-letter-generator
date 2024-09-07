import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../auth/AuthContext";

export function PrivateRoute({ children }) {
    const { currentUser } = useContext(AuthContext);
    if (currentUser.user) {
        return children;
    }

    return <Navigate to={"/auth/login"} />;
}
