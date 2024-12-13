import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import ProductCard from "../../components/admin/ProductCard";
import Pagination from "../../components/Pagination";
import { useNavigate, Link } from "react-router-dom";

const AdminProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin" || !role) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    axiosInstance
      .get(`products?page=${currentPage}`)
      .then((response) => {
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setTotalPages(response.data.totalPages);
        } else {
          setError("Полученные данные не являются массивом продуктов");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Ошибка при загрузке продуктов");
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">
          <Link className="text-yellow-500" to={`/admin`}>
            Админка
          </Link>
          /Добавки
        </h1>
        <button
          onClick={() => navigate("/admin/products/new")}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Создать продукт
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.slug} product={product} />)
        ) : (
          <div className="font-bold text-xl">Нет доступных продуктов</div>
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

export default AdminProductsList;
