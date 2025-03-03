import React, { useEffect, useState } from "react";
import Api from "../../services/Api";
import { Pencil, Trash } from "lucide-react";
import Swal from "sweetalert2";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ title: "", price: "", stock: "", description: "", image: null });
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await Api.get("/products/");
            setProducts(response.data);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({ title: product.title, price: product.price, stock: product.stock, description: product.description, image: product.image });
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            try {
                await Api.delete(`/products/${id}/`);
                setProducts(products.filter((p) => p.id !== id));
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
            }
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        try {
            if (editingProduct) {
                await Api.put(`/products/${editingProduct.id}/`, formDataToSend, { headers: { "Content-Type": "multipart/form-data" } });
            } else {
                await Api.post("/products/", formDataToSend, { headers: { "Content-Type": "multipart/form-data" } });
            }
            fetchProducts();
            setEditingProduct(null);
            setIsCreating(false);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    };

    if (loading) return <div>Cargando productos...</div>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Gestión de Productos</h2>
            <button className="mb-4 bg-green-500 text-white px-4 py-2 rounded" onClick={() => setIsCreating(true)}>Crear Producto</button>
            <table className="w-full border-collapse border border-gray-200 shadow-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-3">Nombre</th>
                        <th className="border p-3">Descripción</th>
                        <th className="border p-3">Precio</th>
                        <th className="border p-3">Stock</th>
                        <th className="border p-3">Imagen</th>
                        <th className="border p-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="text-center">
                            <td className="border p-3">{product.title}</td>
                            <td className="border p-3">{product.description}</td>
                            <td className="border p-3">${product.price}</td>
                            <td className="border p-3">{product.stock}</td>
                            <td className="border p-3">
                                {product.image && <img src={product.image} alt={product.title} className="w-16 h-16 object-cover" />}
                            </td>
                            <td className="border p-3">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleEdit(product)}>
                                    <Pencil size={16} />
                                </button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(product.id)}>
                                    <Trash size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {(editingProduct || isCreating) && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">{editingProduct ? "Editar" : "Crear"} Producto</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border mb-3" placeholder="Nombre del producto" />
                            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border mb-3" placeholder="Descripción" />
                            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border mb-3" placeholder="Precio" />
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full p-2 border mb-3" placeholder="Stock" />
                            <input type="file" name="image" onChange={handleChange} className="w-full p-2 border mb-3" />
                            <div className="flex justify-end">
                                <button type="button" className="mr-3 bg-gray-400 text-white px-4 py-2 rounded" onClick={() => { setEditingProduct(null); setIsCreating(false); }}>Cancelar</button>
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
