import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../services/Api";

function Home() {
    const [products, setProducts] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await Api.get("/products/");
                setProducts(response.data);
                if (response.data.length >= 4) {
                    setBestSellers(response.data.slice(2, 4));
                }
            } catch (error) {
                console.error("Error fetching products:", error);
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
            <h1 className="text-3xl font-bold text-center mb-8">🍽️ Bienvenido a FoodApp</h1>

            <section className="py-10">
                <h2 className="text-3xl font-bold text-center">🔥 Más Vendidos</h2>
                <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
                    {bestSellers.map((product) => (
                        <div 
                            key={product.id}
                            className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg w-80 transition duration-300 hover:bg-white/20 cursor-pointer"
                            onClick={() => navigate("/productos")} 
                        >
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-40 object-cover rounded-md" 
                            />
                            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
                            <p className="text-gray-700 font-bold">{product.description}</p>
                            <p className="mt-2 font-bold text-black">${product.price}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-10 px-6">
                <h2 className="text-3xl font-bold text-center">⭐ Opiniones de Nuestros Clientes</h2>
                <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
                    <div className="bg-white p-6 rounded-lg shadow w-80">
                        <p className="text-gray-600">"La mejor hamburguesa que he probado, se siente fresca y deliciosa."</p>
                        <p className="text-yellow-500 mt-2">⭐⭐⭐⭐⭐</p>
                        <p className="text-gray-800 font-bold mt-2">- Juan Pérez</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow w-80">
                        <p className="text-gray-600">"Los postres son increíbles, sobre todo el cheesecake. Muy recomendado."</p>
                        <p className="text-yellow-500 mt-2">⭐⭐⭐⭐⭐</p>
                        <p className="text-gray-800 font-bold mt-2">- Ana López</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;