import React, { useState } from "react";
import axiosInstance from "../axiosConfig";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/login", formData);
      console.log("Пользователь вошел:", response.data);
      window.location.href = "/profile";
    } catch (err) {
      setError("Ошибка входа. Проверьте данные.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: "",
        password: "",
        isAnonymous: true,
      });
      console.log("Анонимный вход:", response.data);
      window.location.href = "/profile";
    } catch (err) {
      setError("Ошибка анонимного входа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
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
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleAnonymousLogin}
            className={`w-full py-2 bg-gray-300 text-slate-700 rounded-md shadow-md hover:bg-gray-400 hover:text-white ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Вход..." : "Анонимный вход"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
