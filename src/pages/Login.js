import React, { useState } from "react";
import axiosInstance from "../axiosConfig";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const [anonLoading, setAnonLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ email: "", password: "", general: "" });

    try {
      const response = await axiosInstance.post("auth/login", formData);
      console.log("Пользователь авторизован:", response.data);

      localStorage.setItem("token", response.data.token);

      window.location.href = "/profile";
    } catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;

        if (errorData.errors) {
          const emailError = errorData.errors.find((err) =>
            err.includes("Email")
          );
          const passwordError = errorData.errors.find((err) =>
            err.includes("Пароль")
          );

          if (emailError) {
            setErrors((prev) => ({ ...prev, email: emailError }));
          }
          if (passwordError) {
            setErrors((prev) => ({ ...prev, password: passwordError }));
          }
        }

        if (errorData.message) {
          setErrors((prev) => ({ ...prev, general: errorData.message }));
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

  const handleAnonymousLogin = async () => {
    setAnonLoading(true);
    setErrors({ email: "", password: "", general: "" });

    try {
      const response = await axiosInstance.post("auth/register", {
        isAnonymous: true,
      });
      console.log("Анонимный вход выполнен:", response.data);

      localStorage.setItem("token", response.data.token);

      window.location.href = "/profile";
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        general: "Ошибка при анонимном входе. Попробуйте снова.",
      }));
    } finally {
      setAnonLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>

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
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <button
          onClick={handleAnonymousLogin}
          className={`w-full mt-4 py-2 bg-gray-300 text-slate-700 rounded-md shadow-md hover:bg-gray-400 hover:shadow-inner ${
            anonLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={anonLoading}
        >
          {anonLoading ? "Загрузка..." : "Войти анонимно"}
        </button>
      </div>
    </div>
  );
};

export default Login;
