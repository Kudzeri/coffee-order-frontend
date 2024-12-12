import React from "react";
import { Link } from "react-router-dom";

const SupplementCard = ({ id, name, description, price }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/supplements/${id}`}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 cursor-pointer hover:text-yellow-500">
          {name}
        </h2>
      </Link>
      <p className="text-gray-600 text-base mb-4">{description}</p>
      <p className="text-gray-800 font-bold text-xl">Цена: {price} руб.</p>
    </div>
  );
};

export default SupplementCard;
