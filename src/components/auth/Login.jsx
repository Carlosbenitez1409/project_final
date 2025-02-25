import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

function Login() {
    const [focusedInput, setFocusedInput] = useState(null);

    return (
        <div className='h-[100vh] w-full bg-gradient-to-r from-black to-white flex justify-end items-center p-30'>
            <div className='h-auto w-80 bg-white p-6 rounded-lg shadow-xl'>
                <h2 className="text-center text-xl font-bold mb-4 text-black">Login</h2>
                <form className="space-y-4">
                    <div className={`flex items-center border rounded px-2 ${focusedInput === "username" ? "border-black" : "border-gray-400"}`}>
                        <FaUser className="text-gray-400" />
                        <input className='w-full p-2 bg-transparent outline-none text-black'
                            placeholder='Username' type="text"
                            onFocus={() => setFocusedInput("username")}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </div>
                    <div className={`flex items-center border rounded px-2 ${focusedInput === "password" ? "border-black" : "border-gray-400"}`}>
                        <FaLock className="text-gray-400" />
                        <input className='w-full p-2 bg-transparent outline-none text-black'
                            placeholder='Password' type="password"
                            onFocus={() => setFocusedInput("password")}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </div>
                    <button className="w-full bg-black text-white font-bold py-2 rounded mt-4 hover:bg-gray-800 transition">
                        Login
                    </button>
                    <span className="block text-center mt-2 text-gray-600">
                        No tienes cuenta? <span className="text-black cursor-pointer">Regístrate</span>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Login;
