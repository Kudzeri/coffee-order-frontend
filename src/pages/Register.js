import React, { useState } from "react";
import axiosInstance from "../axiosConfig";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isAnonymous: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "", // Для общей ошибки
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", general: "" })); // Сбрасываем ошибки при изменении данных
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ email: "", password: "", general: "" }); // Сбрасываем ошибки перед новым запросом

    try {
      const response = await axiosInstance.post("auth/register", formData);
      console.log("Пользователь зарегистрирован:", response.data);
      window.location.href = "/login"; // Перенаправление на страницу входа
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMessage =
          err.response.data.message || "Ошибка регистрации. Попробуйте снова.";

        // Если ошибка касается конкретных полей (email или password)
        if (errorMessage.includes("Email")) {
          setErrors((prev) => ({ ...prev, email: errorMessage }));
        } else if (errorMessage.includes("Пароль")) {
          setErrors((prev) => ({ ...prev, password: errorMessage }));
        } else if (errorMessage.includes("Пользователь с таким email")) {
          // Специфическая ошибка для существующего email
          setErrors((prev) => ({
            ...prev,
            general: "Пользователь с таким email уже существует.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, general: errorMessage }));
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          general: "Неизвестная ошибка. Попробуйте снова.",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>

        {/* Общая ошибка */}
        {errors.general && (
          <div className="text-red-500 text-sm mb-4">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
              required
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
              required
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 bg-yellow-500 text-slate-700 rounded-md shadow-md hover:bg-yellow-600 hover:shadow-inner hover:text-white ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Регистрация..." : "Регистрация"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
