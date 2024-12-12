import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import CategoryCard from "../../components/admin/CategoryCard";
import Pagination from "../../components/Pagination";

const AdminCategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axiosInstance
      .get(`categories?page=${currentPage}`)
      .then((response) => {
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
        <h1>Админка/Категории</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard
              key={category._id}
              id={category._id}
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

export default AdminCategoriesList;
