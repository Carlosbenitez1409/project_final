import { useState, useEffect } from "react";
import Api from "../services/Api";
import useSearch from "../hooks/useSearch";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { selectedProduct, setSelectedProduct } = useSearch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await Api.get("/products/");
                setProducts(response.data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen text-white p-6" style={{
            backgroundImage: "url('https://img.freepik.com/foto-gratis/arreglo-emojis-dia-mundial-sonrisa_23-2149024494.jpg?t=st=1740625112~exp=1740628712~hmac=332b157deffbd0b0a46199aee0a3d22815178f598385af5f758aecfff29a54a5&w=1380')",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }}>
            <h1 className="text-3xl font-bold text-center mb-8">🍽️ Nuestros Productos</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg cursor-pointer hover:bg-white/20 transition-all"
                        onClick={() => setSelectedProduct(product)}
                    >
                        {product.image && (
                            <img
                                src={`http://127.0.0.1:8000${product.image}`}
                                alt={product.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        )}
                        <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
                        <p className="text-gray-300 mt-1">{product.description}</p>
                        <p className="text-red-800 font-bold mt-2">${product.price}</p>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-lg p-4 z-[9999]">
                    <div className="bg-white/10 backdrop-blur-lg text-white rounded-lg p-6 w-full max-w-md relative shadow-xl">
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
                        <button
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600 transition-all"
                        >
                            Comprar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
