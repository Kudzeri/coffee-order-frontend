import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/products/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2 cursor-pointer hover:text-yellow-500">
          {product.name}
        </h2>
      </Link>
      <p className="text-gray-600 text-base mb-4">{product.description}</p>
      <p className="text-lg font-semibold text-gray-900 mb-4">
        Цена: <span className="text-green-600">{product.price} тг.</span>
      </p>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Категория:
        </h3>
        <p className="text-gray-700">{product.category.name}</p>
        <p className="text-gray-600">{product.category.description}</p>
      </div>

      {product.supplements && product.supplements.length > 0 && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Добавки:
          </h3>
          <ul className="space-y-4">
            {product.supplements.map((supplement) => (
              <li
                key={supplement._id}
                className="p-4 bg-white rounded-lg shadow-sm"
              >
                <p className="font-semibold text-gray-800">{supplement.name}</p>
                <p className="text-gray-600">{supplement.description}</p>
                <p className="text-gray-900 font-semibold">
                  Цена:{" "}
                  <span className="text-green-600">{supplement.price} тг.</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
