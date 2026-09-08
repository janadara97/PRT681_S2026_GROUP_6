import { createContext, useState } from "react";
import { login as requestLogin } from "../api/auth";
import { TOKEN_STORAGE_KEY } from "../api/client";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    const [token, setToken] = useState(savedToken);

    async function login(username, password) {
        const result = await requestLogin(username, password);
        localStorage.setItem(TOKEN_STORAGE_KEY, result.token);
        setToken(result.token);
    }

    function logout() {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setToken(null);
    }
    const value = {
        token: token,
        isAuthenticated: token != null,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
