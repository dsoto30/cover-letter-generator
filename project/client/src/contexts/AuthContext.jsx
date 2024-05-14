import React, {
    createContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
    useContext,
} from "react";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onIdTokenChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        const handleTokenRefresh = async () => {
            if (currentUser) {
                await currentUser.getIdToken();
                // You can perform additional actions with the token if needed
            }
        };

        const tokenRefreshInterval = setInterval(handleTokenRefresh, 3600000); // Refresh token every hour (3600000 milliseconds)

        return () => clearInterval(tokenRefreshInterval);
    }, [currentUser]);

    const signUp = useCallback((email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }, []);

    const login = useCallback((email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }, []);

    const logout = useCallback(() => {
        return signOut(auth);
    }, []);

    const updateDisplayName = useCallback(
        (newDisplayName) => {
            if (currentUser) {
                updateProfile(currentUser, { displayName: newDisplayName });
            }
        },
        [currentUser]
    );

    const authValues = useMemo(
        () => ({ currentUser, signUp, login, logout, updateDisplayName }),
        [currentUser, signUp, login, logout, updateDisplayName]
    );

    return (
        <AuthContext.Provider value={authValues}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
