import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import ProductCard from "../components/ProductCard"; // Компонент карточки продукта
import Pagination from "../components/Pagination";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axiosInstance
      .get(`/products?page=${currentPage}`)
      .then((response) => {
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setTotalPages(response.data.totalPages);
        } else {
          setError("Полученные данные не являются массивом продуктов");
        }
        setLoading(false);
      })
      .catch((err) => {
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
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              title={product.name}
              slug={product.slug}
              image={product.image}
              description={product.description}
              price={product.price}
            />
          ))
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

export default ProductsPage;
