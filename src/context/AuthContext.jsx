import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("accessToken");

        let userData = null;

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                userData = { id: decodedToken.user_id, name: decodedToken.name, role: decodedToken.role };
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        }

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            userData = { ...userData, ...parsedUser };
        }

        setUser(userData);
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};
