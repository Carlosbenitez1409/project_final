import React from "react";

const ProductModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-black relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    ✖
                </button>
                <h2 className="text-xl font-bold">{product.title}</h2>
                <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-40 object-cover rounded-lg my-3"
                />
                <p className="text-gray-700">{product.description}</p>
                <p className="text-lg font-semibold mt-2">${product.price}</p>
                <button 
                    onClick={onClose} 
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default ProductModal;
