import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ username: "", email: "", role: "cliente" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/users/', {  
                headers: {  
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,  
                }  
            });
            setUsers(response.data);
        } catch (err) {
            setError("No se pudieron cargar los usuarios.");
            console.error(err);
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setFormData({ username: user.username, email: user.email, role: user.role });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/users/update/${editingUser.id}/`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            });
            setEditingUser(null);
            fetchUsers(); 
        } catch (err) {
            console.error("Error al actualizar el usuario:", err);
        }
    };

    const toggleUserStatus = async (user) => {
        const url = user.is_active
            ? `http://127.0.0.1:8000/api/users/deactivate/${user.id}/`
            : `http://127.0.0.1:8000/api/users/activate/${user.id}/`;
    
        try {
            await axios.post(url, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            });
            fetchUsers(); 
        } catch (err) {
            console.error("Error al cambiar el estado del usuario:", err);
        }
    };
    
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>

            {error && <p className="text-red-500">{error}</p>}

            {users.length === 0 ? (
                <p className="text-gray-600">No hay usuarios disponibles.</p>
            ) : (
                <table className="w-full border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-2 px-4">Usuario</th>
                            <th className="py-2 px-4">Correo</th>
                            <th className="py-2 px-4">Rol</th>
                            <th className="py-2 px-4">Estado</th>
                            <th className="py-2 px-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user.id}
                                className={`border-b ${
                                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                }`}
                            >
                                <td className="py-2 px-4">{user.username}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4 capitalize">{user.role}</td>
                                <td className={`py-2 px-4 font-semibold ${user.is_active ? "text-green-500" : "text-red-500"}`}>
                                    {user.is_active ? "Activo" : "Deshabilitado"}
                                </td>
                                <td className="py-2 px-4 flex gap-2">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className={`px-3 py-1 rounded-md text-white ${
                                            user.is_active ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                                        }`}
                                        onClick={() => toggleUserStatus(user)}
                                    >
                                        {user.is_active ? "Deshabilitar" : "Habilitar"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {editingUser && (
                <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Editar Usuario</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="border p-2 rounded-md"
                            placeholder="Nombre de usuario"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 rounded-md"
                            placeholder="Correo electrónico"
                        />
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="border p-2 rounded-md"
                        >
                            <option value="cliente">Cliente</option>
                            <option value="admin">Admin</option>
                        </select>
                        <div className="flex gap-2">
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                Guardar
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                onClick={() => setEditingUser(null)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserList;
