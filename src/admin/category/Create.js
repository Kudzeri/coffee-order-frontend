import React, { useState } from "react";
import axiosInstance from "../../axiosConfig";
import CategoryForm from "../../components/admin/CategoryForm";
import { useNavigate } from "react-router-dom";

const AdminCategoryCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreate = async (data) => {
    setLoading(true);
    setError("");
    try {
      await axiosInstance.post("categories", data);
      navigate("/admin/categories");
    } catch (err) {
      setError("Ошибка при создании категории");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Создание категории</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <CategoryForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
};

export default AdminCategoryCreate;
