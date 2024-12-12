import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import CategoryCard from "../components/CategoryCard";
import Pagination from "../components/Pagination";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axiosInstance
      .get(`categories?page=${currentPage}`)
      .then((response) => {
        // Проверяем, что данные categories это массив
        if (Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
          setTotalPages(response.data.totalPages);
        } else {
          setError("Полученные данные не являются массивом категорий");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Ошибка при загрузке категорий");
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
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.name}
              description={category.description}
            />
          ))
        ) : (
          <div className="font-bold text-xl">Нет доступных категорий</div>
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

export default CategoriesPage;
