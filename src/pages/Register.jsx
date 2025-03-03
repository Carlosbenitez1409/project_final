import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Api from "../services/Api";
import Swal from "sweetalert2";
import logo from "../assets/logo-.png"; 

function Register() {
    const [focusedInput, setFocusedInput] = useState(null);
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            console.log("Datos enviados:", formData);  
    
            const response = await Api.post("/users/register/", formData, { headers: {} });
    
            console.log("Registro exitoso:", response.data);  
            Swal.fire({
                title: "¡Registro exitoso!",
                text: "Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.",
                icon: "success",
                confirmButtonText: "OK"
            }).then(() => {
                navigate("/login");
            });
        } catch (error) {
            console.error("Error en el registro:", error.response);
    
            Swal.fire({
                title: "Error",
                text: error.response?.data?.detail || "Error al registrarse. Intenta de nuevo.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    
        setLoading(false);
    };
    
    return (
        <div className="h-screen flex">
            <div className="hidden md:flex w-1/2 bg-yellow-400 justify-center items-center">
                <img src={logo} alt="Logo" className="w-1/2 max-w-xs" />
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-6">
                <div className="w-96 bg-white p-8 rounded-lg shadow-xl">
                    <h2 className="text-center text-2xl font-bold mb-6 text-black">Register</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className={`flex items-center border rounded px-3 py-2 ${focusedInput === "username" ? "border-black" : "border-gray-400"}`}>
                            <FaUser className="text-gray-500 mr-2" />
                            <input
                                className="w-full bg-transparent outline-none text-black"
                                placeholder="Username"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                onFocus={() => setFocusedInput("username")}
                                onBlur={() => setFocusedInput(null)}
                                required
                            />
                        </div>

                        <div className={`flex items-center border rounded px-3 py-2 ${focusedInput === "email" ? "border-black" : "border-gray-400"}`}>
                            <MdEmail className="text-gray-500 mr-2" />
                            <input
                                className="w-full bg-transparent outline-none text-black"
                                placeholder="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedInput("email")}
                                onBlur={() => setFocusedInput(null)}
                                required
                            />
                        </div>

                        <div className={`flex items-center border rounded px-3 py-2 ${focusedInput === "password" ? "border-black" : "border-gray-400"}`}>
                            <FaLock className="text-gray-500 mr-2" />
                            <input
                                className="w-full bg-transparent outline-none text-black"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onFocus={() => setFocusedInput("password")}
                                onBlur={() => setFocusedInput(null)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white font-bold py-2 rounded mt-4 hover:bg-gray-800 transition"
                            disabled={loading}
                        >
                            {loading ? "Registrando..." : "Register"}
                        </button>

                        <span className="block text-center mt-2 text-gray-600">
                        Already have an account? <span className="text-black cursor-pointer" onClick={() => navigate("/login")}>Login</span>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
