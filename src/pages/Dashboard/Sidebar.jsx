import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white h-full p-4">
            <h2 className="text-2xl mb-4">Dashboard</h2>
            <ul>
                <li>
                    <Link to="users" className="block py-2 px-4 hover:bg-gray-700 rounded">Usuarios</Link>
                </li>
                <li>
                    <Link to="products" className="block py-2 px-4 hover:bg-gray-700 rounded">Productos</Link>
                </li>
                <li>
                    <Link to="orders" className="block py-2 px-4 hover:bg-gray-700 rounded">Órdenes</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
