import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

const AdminCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`categories/${id}`)
      .then((response) => {
        setCategory(response.data.category);
        setLoading(false);
      })
      .catch((err) => {
        setError("Ошибка при загрузке категории");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`categories/${id}`);
      navigate("/admin/categories");
    } catch (err) {
      setError("Ошибка при удалении категории");
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      {category ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl text-gray-700 mb-6">{category.description}</p>

          <button
            onClick={() => navigate(`/admin/categories/edit/${id}`)}
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 mr-4"
          >
            Редактировать
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Удалить
          </button>
        </div>
      ) : (
        <div>Категория не найдена</div>
      )}
    </div>
  );
};

export default AdminCategoryPage;
