import React, {
    createContext,
    useState,
    useContext,
    useCallback,
    useMemo,
    useEffect,
} from "react";

import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signUp = useCallback(async (email, password, displayName) => {
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(user, { displayName: displayName });
        } catch (error) {
            throw error;
        }
    }, []);

    const login = useCallback((email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }, []);

    const logout = useCallback(() => {
        return signOut(auth);
    }, []);

    const authValues = useMemo(
        () => ({ currentUser, signUp, login, logout }),
        [currentUser, signUp, login, logout]
    );

    return (
        <AuthContext.Provider value={authValues}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
