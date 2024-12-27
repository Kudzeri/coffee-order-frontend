import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`categories/${id}`)
      .then((response) => {
        const { category, products } = response.data;
        setCategory(category);
        setProducts(products);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
          <div className="font-bold text-xl">Тут еще нет товаров. Добавим их позже :)</div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
