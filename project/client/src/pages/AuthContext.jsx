import React, {
    createContext,
    useState,
    useContext,
    useCallback,
    useMemo,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = useCallback((user) => setUser(user), []);
    const logout = useCallback(() => setUser(null), []);

    const authValues = useMemo(
        () => ({ user, login, logout }),
        [user, login, logout]
    );

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
