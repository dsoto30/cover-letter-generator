import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Error } from "./components/layout/Error";
import Home from "./components/layout/Home";
import { Auth } from "./components/auth/Auth";
import { setUser } from "./redux/authSlice";
import { auth } from "./firebase";
import { selectUser, selectLoading } from "./redux/authSlice";
import NavbarLayout from "./components/layout/NavbarLayout";
import Loading from "./components/layout/Loading";

export default function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const loading = useSelector(selectLoading);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(setUser({ uid, email, displayName }));
            } else {
                console.log("No user is signed in");
            }
        });
        return unsubscribe;
    }, [dispatch]);

    if (loading) {
        return <Loading />;
    }

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
