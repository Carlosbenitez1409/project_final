import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import Users from "./pages/Dashboard/Users";
import Orders from "./pages/Dashboard/Orders";
import Products from "./pages/Dashboard/Products";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/DashBoard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={<Users />}
          />
          <Route
            path="/admin/products"
            element={<Products />}
          />
          <Route
            path="/admin/orders"
            element={<Orders />}  
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;