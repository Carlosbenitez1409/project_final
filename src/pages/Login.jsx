import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import Api from "../services/Api"; 

function Login() {
    const [focusedInput, setFocusedInput] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (username.trim() === "" || password.trim() === "") {
            alert("Por favor ingresa usuario y contraseña");
            return;
        }
    
        try {
            const response = await Api.post("/users/login/", { username, password });
    
            console.log("Respuesta del login:", response.data); 
    
            localStorage.setItem("accessToken", response.data.tokens.access);
            localStorage.setItem("refreshToken", response.data.tokens.refresh);
    
            localStorage.setItem("user", JSON.stringify({
                name: response.data.user.username,
                role: response.data.user.role,
            }));
    
            window.dispatchEvent(new Event("storage"));
    
            navigate("/");
        } catch (error) {
            console.error("Error en el login:", error.response?.data || error.message);
            alert("Usuario o contraseña incorrectos");
        }
    };
    

    return (
        <div className='h-[100vh] w-full bg-gradient-to-r from-black to-white flex justify-end items-center p-30'>
            <div className='h-auto w-80 bg-white p-6 rounded-lg shadow-xl'>
                <h2 className="text-center text-xl font-bold mb-4 text-black">Login</h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div className={`flex items-center border rounded px-2 ${focusedInput === "username" ? "border-black" : "border-gray-400"}`}>
                        <FaUser className="text-gray-400" />
                        <input
                            className='w-full p-2 bg-transparent outline-none text-black'
                            placeholder='Username'
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onFocus={() => setFocusedInput("username")}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </div>

                    <div className={`flex items-center border rounded px-2 ${focusedInput === "password" ? "border-black" : "border-gray-400"}`}>
                        <FaLock className="text-gray-400" />
                        <input
                            className='w-full p-2 bg-transparent outline-none text-black'
                            placeholder='Password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setFocusedInput("password")}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </div>

                    <button type="submit" className="w-full bg-black text-white font-bold py-2 rounded mt-4 hover:bg-gray-800 transition">
                        Login
                    </button>

                    <span className="block text-center mt-2 text-gray-600">
                        ¿No tienes cuenta? <span className="text-black cursor-pointer">Regístrate</span>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Login;
