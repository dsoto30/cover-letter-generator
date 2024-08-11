import React, { createContext, useState, useEffect, useReducer } from "react";
import { auth, storage } from "../../firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
} from "firebase/auth";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const userReducer = (state, action) => {
    const { user, type } = action;

    switch (type) {
        case "REGISTER":
            return {
                ...state,
                user: user,
            };
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
    const [authMethod, setAuthMethod] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(authMethod);
                console.log("user logged in", currentUser.user);
            } else {
                console.log("user logged out or not signed in");
            }
        });

        return unsubscribe;
    }, [currentUser.user, authMethod]);

    const login = async (email, password) => {
        try {
            setLoading(true);
            setAuthMethod("login");

            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            setCurrentUser({
                type: "LOGIN",
                user: user.user,
            });

            navigate("/auth/profile");
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const uploadResume = async (uploadTask) => {
        try {
            const downloadURL = await new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {},
                    (error) => {
                        reject(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                resolve(downloadURL);
                            }
                        );
                    }
                );
            });
            return downloadURL;
        } catch (error) {
            setAuthError(error.message);
        }
    };

    const register = async (email, password, resume) => {
        try {
            setLoading(true);
            setAuthMethod("register");
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            //await sendEmailVerification(auth.currentUser);

            const storageRef = ref(storage, `resumes/${email}.pdf`);
            const uploadTask = uploadBytesResumable(storageRef, resume, {
                contentType: "application/pdf",
            });

            const downloadURL = await uploadResume(uploadTask);

            setCurrentUser({
                type: "REGISTER",
                user: user.user,
            });
            setAuthMethod("login");
            navigate("/auth/profile");
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            setAuthMethod("");
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
                authMethod,
                setAuthMethod,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
