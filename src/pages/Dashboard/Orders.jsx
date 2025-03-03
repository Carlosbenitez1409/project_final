import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Api from "../../services/Api";

const statusColors = {
    pending: "bg-yellow-200 text-yellow-800",
    processing: "bg-blue-200 text-blue-800",
    completed: "bg-green-200 text-green-800",
    cancelled: "bg-red-200 text-red-800"
};

const statusOptions = ["pending", "processing", "completed", "cancelled"];

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user || !user.role) return; 
    
        const fetchOrders = async () => {
            try {
                const response = user.role === "admin"
                    ? await Api.get("/orders/")
                    : await Api.get("/orders/", { params: { user: user.id } });
    
                setOrders(response.data);
            } catch (error) {
                console.error("Error al obtener las órdenes:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchOrders();
    }, [user]);    

    const handleDelete = async (orderId) => {
        if (!window.confirm("¿Seguro que quieres eliminar esta orden?")) return;

        try {
            setUpdating(true);
            await Api.delete(`/orders/${orderId}/delete/`);
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error("Error al eliminar la orden:", error.response?.data?.message || error.message);
        } finally {
            setUpdating(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setUpdating(true);
            await Api.patch(`/orders/${orderId}/update/`, { status: newStatus });
            setOrders(orders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error("Error al actualizar el estado:", error.response?.data?.message || error.message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="text-center text-lg font-semibold">Cargando...</div>;

    return (
        <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center pb-6"></h2>
            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No hay órdenes disponibles.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                                <th className="py-3 px-4 border">Orden</th>
                                <th className="py-3 px-4 border">Cliente</th>
                                <th className="py-3 px-4 border">Estado</th>
                                <th className="py-3 px-4 border">Total</th>
                                {user.role === "admin" && <th className="py-3 px-4 border">Acciones</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4 text-center">#{order.id}</td>
                                    <td className="py-3 px-4 text-center">{order.user.username}</td>
                                    <td className="py-3 px-4 text-center">
                                        {user.role === "admin" ? (
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                className={`px-3 py-1 rounded-lg text-sm font-semibold ${statusColors[order.status]} cursor-pointer`}
                                                disabled={updating}
                                            >
                                                {statusOptions.map(status => (
                                                    <option key={status} value={status}>
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${statusColors[order.status]}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-center font-semibold">${order.total}</td>
                                    {user.role === "admin" && (
                                        <td className="py-3 px-4 text-center">
                                            <button
                                                onClick={() => handleDelete(order.id)}
                                                className={`bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-200 ${updating ? "opacity-50 cursor-not-allowed" : ""}`}
                                                disabled={updating}
                                            >
                                                {updating ? "Eliminando..." : "Eliminar"}
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Orders;
