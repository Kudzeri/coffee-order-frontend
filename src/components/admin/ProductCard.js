import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link to={`${product.slug}`} className="block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-yellow-500 transition-colors">
          {product.name}
        </h2>
      </Link>
      <p className="text-gray-700 text-sm mb-3">{product.description}</p>
      <p className="text-lg font-semibold text-gray-800 mb-4">
        Цена: <span className="text-green-500">{product.price} тг.</span>
      </p>

      <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-1">Категория:</h3>
        <p className="text-gray-800">{product.category.name}</p>
        <p className="text-gray-600 text-xs">{product.category.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
