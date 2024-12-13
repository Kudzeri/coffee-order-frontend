import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

const AdminProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin" || !role) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axiosInstance
      .get(`products/${slug}`)
      .then((response) => {
        setProduct(response.data.product);
        setLoading(false);
      })
      .catch(() => {
        setError("Ошибка при загрузке продукта");
        setLoading(false);
      });
  }, [slug]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`products/${slug}`);
      navigate("/admin/products");
    } catch {
      setError("Ошибка при удалении продукта");
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
      {product ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <img
            src={product.image}
            alt={product.name}
            className="mb-4 w-full max-w-md"
          />
          <p className="text-xl text-gray-700 mb-6">{product.description}</p>
          <p className="text-xl text-gray-700 mb-6">
            Цена: {product.price} тг.
          </p>
          <button
            onClick={() => navigate(`/admin/products/edit/${slug}`)}
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
        <div>Продукт не найден</div>
      )}
    </div>
  );
};

export default AdminProductPage;
