import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/authSlice";
import { auth } from "./firebase";
import { selectUser, selectLoading } from "./redux/authSlice";
import Loading from "./components/layout/Loading";
import AppLayout from "./components/layout/AppLayout";

export default function App() {
    //const dispatch = useDispatch();
    //const user = useSelector(selectUser);
    const loading = useSelector(selectLoading);
    /*
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(`User logged in: ${user.email}`);
                const { uid, email, displayName } = user;
                dispatch(setUser({ uid, email, displayName }));
            } else {
                console.log("User logged out");
            }
        });
        return unsubscribe;
    }, [dispatch]);*/

    if (loading) {
        return <Loading />;
    }

    return <AppLayout />;
}
