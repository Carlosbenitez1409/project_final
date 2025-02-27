import axios from "axios";

const Api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

//interceptor para agregar el token a cada solicitud
Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

//interceptor para manejar tokens expirados y refrescarlos
Api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refreshToken");

                if (!refreshToken) {
                    console.warn("No refresh token available, logging out...");
                    handleLogout();
                    return Promise.reject(error);
                }

                const { data } = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
                    refresh: refreshToken,
                });

                localStorage.setItem("accessToken", data.access);
                Api.defaults.headers.Authorization = `Bearer ${data.access}`;
                originalRequest.headers.Authorization = `Bearer ${data.access}`;

                return Api(originalRequest); //reintenta la petición original con el nuevo token
            } catch (refreshError) {
                handleLogout(); //si falla el refresh cierra la sesión
            }
        }
        return Promise.reject(error);
    }
);

//función para cerrar sesión si el refresh token falla
const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.dispatchEvent(new Event("storage"));
    alert("Sesión expirada. Inicia sesión nuevamente.");
};

export default Api;
