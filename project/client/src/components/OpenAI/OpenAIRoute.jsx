import React from "react";
import { Routes, Route } from "react-router-dom";

import Generate from "./Generate";
import { PrivateRoute } from "../auth/PrivateRoute";

function OpenAiRoute() {
    return (
        <>
            <Routes>
                <Route
                    path="generate"
                    element={
                        <PrivateRoute>
                            <Generate />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default OpenAiRoute;
