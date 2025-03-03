import { useState, useEffect } from "react";
import Api from "../services/Api";

const useProducts = () => {
    const [products, setProducts] = useState([]);

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

    return products;
};

export default useProducts;
