import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import SearchBar from "./SearchBar";
import useSearch from "../hooks/useSearch";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    const { selectedProduct, setSelectedProduct } = useSearch();

    useEffect(() => {
        const checkUser = () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                setIsAuthenticated(true);
                setUsername(user.name);
            } else {
                setIsAuthenticated(false);
                setUsername("");
            }
        };

        checkUser();

        window.addEventListener("storage", checkUser);

        return () => {
            window.removeEventListener("storage", checkUser);
        };
    }, []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        setIsAuthenticated(false);
        setUsername("");

        window.dispatchEvent(new Event("storage"));
        alert("Has cerrado sesión");
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md text-white p-4 flex justify-between items-center shadow-md">
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                <ul className="hidden md:flex gap-6 text-lg">
                    <li>
                        <Link to="/" className="hover:text-gray-300 transition">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/productos" className="hover:text-gray-300 transition">Productos</Link>
                    </li>
                </ul>

                <SearchBar onSelectProduct={setSelectedProduct} />

                <div className="hidden md:flex gap-3 items-center">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                            <FaUserCircle size={24} />
                            <span className="font-bold">{username}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transition"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 transition">Login</button>
                            </Link>
                            <Link to="/register">
                                <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition">Register</button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-lg p-4 z-[9999]">
                    <div className="bg-white/10 backdrop-blur-lg text-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
                        <button
                            className="absolute top-2 right-4 text-gray-300 text-2xl hover:text-gray-500 transition-all"
                            onClick={() => setSelectedProduct(null)}
                        >
                            &times;
                        </button>
                        {selectedProduct.image && (
                            <img
                                src={`http://127.0.0.1:8000${selectedProduct.image}`}
                                alt={selectedProduct.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        )}
                        <h2 className="text-2xl font-bold mt-2">{selectedProduct.title}</h2>
                        <p className="text-gray-300 mt-2">{selectedProduct.description}</p>
                        <p className="text-lg font-semibold text-yellow-400 mt-2">${selectedProduct.price}</p>
                        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600 transition-all">
                            Comprar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
