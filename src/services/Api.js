import axios from "axios";

const Api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Error en la solicitud:", error);
        return Promise.reject(error);
    }
);

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

                return Api(originalRequest);

            } catch (refreshError) {
                console.error("Error al refrescar el token:", refreshError);
                handleLogout(); 
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.dispatchEvent(new Event("storage"));
    alert("Sesión expirada. Inicia sesión nuevamente.");
};

export default Api;
