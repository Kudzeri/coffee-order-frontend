import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig"; // Ваш axios конфиг
import SupplementCard from "../components/SupplementCard"; // Ваш компонент для отображения добавки
import Pagination from "../components/Pagination";

const SupplementsPage = () => {
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axiosInstance
      .get(`supplements?page=${currentPage}`)
      .then((response) => {
        if (Array.isArray(response.data.supplements)) {
          setSupplements(response.data.supplements);
          setTotalPages(response.data.totalPages);
        } else {
          setError("Полученные данные не являются массивом добавок");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Ошибка при загрузке добавок");
        setLoading(false);
      });
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {supplements.length > 0 ? (
          supplements.map((supplement) => (
            <SupplementCard
              key={supplement._id}
              id={supplement._id}
              name={supplement.name}
              description={supplement.description}
              price={supplement.price}
            />
          ))
        ) : (
          <div className="font-bold text-xl">Нет доступных добавок</div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SupplementsPage;
