import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ id, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/categories/${id}`}>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 cursor-pointer hover:text-yellow-500">
          {title}
        </h2>
      </Link>
      <p className="text-gray-600 text-base">{description}</p>
    </div>
  );
};

export default CategoryCard;
