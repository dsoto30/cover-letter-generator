import React, { createContext, useState, useEffect, useReducer } from "react";
import { auth } from "../../firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    browserSessionPersistence,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { uploadResume } from "./storageHelper";

export const AuthContext = createContext(null);

const userReducer = (state, action) => {
    const { user, type } = action;

    switch (type) {
        case "LOGIN":
            return {
                ...state,
                user: user,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useReducer(userReducer, {
        user: null,
    });
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser({
                    type: "LOGIN",
                    user: user,
                });
                navigate("/auth/profile");
            } else {
                console.log("user logged out or not signed in");
            }
        });

        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);

            await auth.setPersistence(browserSessionPersistence);

            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password, resume) => {
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password);

            await uploadResume(email, resume);

            //await sendEmailVerification(auth.currentUser);
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await signOut(auth);
            setCurrentUser({
                type: "LOGOUT",
                user: null,
            });
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                login,
                logout,
                register,
                loading,
                authError,
                setAuthError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
