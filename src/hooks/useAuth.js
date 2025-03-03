import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const token = localStorage.getItem("accessToken"); 

        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Token decodificado:", decoded);
                
                setUser({
                    id: decoded.user_id,
                    name: decoded.name,  
                    role: decoded.role
                });
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                setUser(null); 
            }
        } else {
            setUser(null); 
        }
    }, []);

    return user;
};

export default useAuth;
