import { useState, useEffect } from "react";
import Api from "../services/Api";

const useSearch = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    const searchProducts = (query) => {
        if (!query) {
            setFilteredProducts([]);
        } else {
            const filtered = products.filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    return { products, filteredProducts, searchProducts, selectedProduct, setSelectedProduct };
};

export default useSearch;
