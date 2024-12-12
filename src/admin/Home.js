import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin" || !role) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Админ панель
        </h2>

        <div className="space-y-4">
          <Link
            to="/admin/categories"
            className="block text-center bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600"
          >
            Категории
          </Link>

          <Link
            to="/admin/supplements"
            className="block text-center bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-600"
          >
            Добавки
          </Link>

          <Link
            to="/admin/products"
            className="block text-center bg-purple-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-purple-600"
          >
            Продукты
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
