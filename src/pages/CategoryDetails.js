import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig"; // Ваш axios конфиг
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { id } = useParams();
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
        </div>
      ) : (
        <div>Категория не найдена</div>
      )}
    </div>
  );
};

export default CategoryPage;
