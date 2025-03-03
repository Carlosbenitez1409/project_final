import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUsers, FaBox, FaClipboardList } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [activeLink, setActiveLink] = useState("");
    const location = useLocation();

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    useEffect(() => {
        console.log("Usuario en Dashboard:", user);
    }, [user]);

    return (
        <div className="flex">
            <aside className="w-64 bg-gray-800 text-white fixed top-16 left-0 h-[calc(100vh-4rem)] p-4">
                <ul>
                    <li className={`mb-4 flex items-center ${activeLink.includes("users") ? "bg-gray-700" : ""}`}>
                        <Link to="/admin/users" className="flex items-center">
                            <FaUsers className="mr-2" /> Usuarios
                        </Link>
                    </li>
                    <li className={`mb-4 flex items-center ${activeLink.includes("products") ? "bg-gray-700" : ""}`}>
                        <Link to="/admin/products" className="flex items-center">
                            <FaBox className="mr-2" /> Productos
                        </Link>
                    </li>
                    <li className={`mb-4 flex items-center ${activeLink.includes("orders") ? "bg-gray-700" : ""}`}>
                        <Link to="/admin/orders" className="flex items-center">
                            <FaClipboardList className="mr-2" /> Órdenes
                        </Link>
                    </li>
                </ul>
            </aside>
            <main className="flex-1 p-6 bg-gray-100 ml-64 pt-20">
                <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
                {user && <p>Usuario: {user.name} - Rol: {user.role}</p>}
            </main>
        </div>
    );
};

export default AdminDashboard;
