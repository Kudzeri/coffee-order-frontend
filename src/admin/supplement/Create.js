import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import SupplementForm from "../../components/admin/SupplementForm";
import { useNavigate } from "react-router-dom";

const AdminSupplementCreate = () => {
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
      await axiosInstance.post("supplements", data); // эндпоинт для добавки
      navigate("/admin/supplements");
    } catch (err) {
      setError("Ошибка при создании добавки");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Создание добавки</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <SupplementForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
};

export default AdminSupplementCreate;
