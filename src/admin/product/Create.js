import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import ProductForm from "../../components/admin/ProductForm"; // Импортируем компонент для формы продукта
import { useNavigate } from "react-router-dom";

const AdminProductCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin" || !role) {
      navigate("/");
    }
  }, [navigate]);

  const handleCreate = async (data) => {
    setLoading(true);
    setError("");
    try {
      await axiosInstance.post("products", data);
      navigate("/admin/products");
    } catch (err) {
      setError("Ошибка при создании продукта");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Создание продукта</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <ProductForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
};

export default AdminProductCreate;
