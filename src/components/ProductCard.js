import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ slug, title, description, price, image }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/products/${slug}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 cursor-pointer hover:text-yellow-500">
          {title}
        </h2>
      </Link>
      <p className="text-gray-600 text-base mb-4">{description}</p>
      <p className="text-gray-900 text-lg font-semibold">{price} тг.</p>
    </div>
  );
};

export default ProductCard;
