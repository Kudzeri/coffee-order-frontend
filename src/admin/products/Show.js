import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useParams, useNavigate, Link } from "react-router-dom";

const AdminProductPage = () => {
  const { id } = useParams();
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
      .get(`products/${id}`)
      .then((response) => {
        setProduct(response.data.product);
        setLoading(false);
      })
      .catch((err) => {
        setError("Ошибка при загрузке продукта");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`products/${id}`);
      navigate("/admin/products");
    } catch (err) {
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
      <h1 className="text-2xl font-bold">
        <Link className="text-yellow-500" to={`/admin`}>
          Админка
        </Link>
        /Продукты
      </h1>
      {product ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md mb-6 rounded-lg shadow-lg"
          />
          <p className="text-xl text-gray-700 mb-6">{product.description}</p>
          <p className="text-lg text-gray-800 mb-4">
            Категория: {product.category?.name || "Не указана"}
          </p>
          <p className="text-lg text-gray-800 mb-6">Цена: {product.price}₽</p>

          {product.supplements && product.supplements.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Добавки:</h2>
              <ul className="list-disc pl-6">
                {product.supplements.map((supplement) => (
                  <li key={supplement._id}>
                    {supplement.name} - {supplement.description} (
                    {supplement.price}₽)
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => navigate(`/admin/products/edit/${id}`)}
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
