import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mt-6 space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
      >
        Назад
      </button>

      <span className="text-lg font-medium text-gray-700">
        Страница {currentPage} из {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-redred-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
      >
        Вперёд
      </button>
    </div>
  );
};

export default Pagination;
