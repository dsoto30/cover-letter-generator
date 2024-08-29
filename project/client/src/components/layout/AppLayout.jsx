import { Routes, Route } from "react-router-dom";
import NavbarLayout from "./NavbarLayout";
import Home from "./Home";
import { Error } from "./Error";
import { Auth } from "../auth/Auth";
import Loading from "./Loading";
import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import OpenAiRoute from "../OpenAI/OpenAIRoute";

function AppLayout() {
    const { loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <NavbarLayout />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/*" element={<Auth />} />
                <Route path="/openAI/*" element={<OpenAiRoute />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
}

export default AppLayout;
