import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const ProductPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSupplements, setSelectedSupplements] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/products/${slug}`)
      .then((response) => {
        setProduct(response.data.product);
        setLoading(false);
      })
      .catch((err) => {
        setError("Ошибка при загрузке продукта");
        setLoading(false);
      });
  }, [slug]);

  const handleSupplementChange = (supplementId) => {
    setSelectedSupplements((prev) => {
      if (prev.includes(supplementId)) {
        return prev.filter((id) => id !== supplementId);
      } else {
        return [...prev, supplementId];
      }
    });
  };

  
  if (loading) {
    return <div className="text-center text-xl text-gray-600">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      {product ? (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-auto rounded-lg shadow-md mx-auto"
              />
            </div>

            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                {product.description}
              </p>
              <p className="text-lg text-gray-900 font-semibold mb-6">
                Цена: <span className="text-green-600">{product.price} тг.</span>
              </p>

              <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Категория:
                </h2>
                <p className="text-gray-700">{product.category.name}</p>
                <p className="text-gray-600">{product.category.description}</p>
              </div>

              {product.supplements && product.supplements.length > 0 && (
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Добавки:
                  </h2>
                  <ul className="space-y-4">
                    {product.supplements.map((supplement) => (
                      <li key={supplement._id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={supplement._id}
                          value={supplement._id}
                          onChange={() => handleSupplementChange(supplement._id)}
                          className="mr-2"
                        />
                        <label htmlFor={supplement._id} className="text-gray-800">
                          {supplement.name} ({supplement.price} тг.)
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
              >
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl text-gray-600">Продукт не найден</div>
      )}
    </div>
  );
};

export default ProductPage;
