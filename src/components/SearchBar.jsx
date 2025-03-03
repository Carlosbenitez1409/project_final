import { useState } from "react";
import useSearch from "../hooks/useSearch";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const { filteredProducts, searchProducts, setSelectedProduct } = useSearch(); 

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        searchProducts(value);
    };

    return (
        <div className="relative w-64">
            <input
                type="text"
                placeholder="Buscar productos..."
                value={query}
                onChange={handleSearch}
                className="px-4 py-2 border rounded-lg w-full text-black"
            />
            {filteredProducts.length > 0 && (
                <ul className="absolute bg-white text-black rounded-lg w-full mt-1 shadow-md z-50">
                    {filteredProducts.map((product) => (
                        <li
                            key={product.id}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                console.log("Producto seleccionado:", product);
                                setSelectedProduct(product); 
                            }}
                        >
                            {product.title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
