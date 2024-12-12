import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminSupplementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplement, setSupplement] = useState(null);
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
      .get(`supplements/${id}`)
      .then((response) => {
        setSupplement(response.data.supplement);
        setLoading(false);
      })
      .catch((err) => {
        setError("Ошибка при загрузке добавки");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`supplements/${id}`);
      navigate("/admin/supplements");
    } catch (err) {
      setError("Ошибка при удалении добавки");
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
          /Добавки
        </h1>

      {supplement ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{supplement.name}</h1>
          <p className="text-xl text-gray-700 mb-6">{supplement.description}</p>
          <p className="text-xl text-gray-700 mb-6">
            Цена: {supplement.price} тг.
          </p>

          <button
            onClick={() => navigate(`/admin/supplements/edit/${id}`)}
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
        <div>Добавка не найдена</div>
      )}
    </div>
  );
};

export default AdminSupplementPage;
