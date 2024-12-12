import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig"; 
import { useParams } from "react-router-dom";

const SupplementPage = () => {
  const { id } = useParams();
  const [supplement, setSupplement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      {supplement ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">{supplement.name}</h1>
          <p className="text-xl text-gray-700 mb-6">{supplement.description}</p>
          <p className="text-xl font-semibold text-gray-800">
            Цена: {supplement.price} руб.
          </p>
        </div>
      ) : (
        <div>Добавка не найдена</div>
      )}
    </div>
  );
};

export default SupplementPage;
