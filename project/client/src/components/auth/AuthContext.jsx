import React, { createContext, useState, useEffect, useReducer } from "react";
import { auth, storage } from "../../firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    browserSessionPersistence,
} from "firebase/auth";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

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
    const [resumeExists, setResumeExists] = useState(false);

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
    }, [resumeExists]);

    const login = async (email, password) => {
        try {
            setLoading(true);

            await auth.setPersistence(browserSessionPersistence);

            setResumeExists(true);

            await signInWithEmailAndPassword(auth, email, password);
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

            await uploadResume(uploadTask);

            setResumeExists(true);
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            setResumeExists(false);
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
                resumeExists,
                setResumeExists,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
