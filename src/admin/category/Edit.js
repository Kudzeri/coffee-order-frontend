import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import CategoryForm from "../../components/admin/CategoryForm";
import { useParams, useNavigate } from "react-router-dom";

const AdminCategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`categories/${id}`);
        setCategory(response.data.category);
      } catch (err) {
        setError("Ошибка при загрузке категории");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  const handleUpdate = async (data) => {
    setLoading(true);
    setError("");
    try {
      await axiosInstance.put(`categories/${id}`, data);
      navigate("/admin/categories");
    } catch (err) {
      setError("Ошибка при обновлении категории");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Редактирование категории</h1>
      {category && (
        <CategoryForm
          initialData={category}
          onSubmit={handleUpdate}
          loading={loading}
        />
      )}
    </div>
  );
};

export default AdminCategoryEdit;
