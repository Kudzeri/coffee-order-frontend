import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig"; // Ваш axios конфиг

const ProductForm = ({ initialData = {}, onSubmit, loading }) => {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [supplements, setSupplements] = useState(initialData.supplements || []);
  const [categories, setCategories] = useState([]);
  const [allSupplements, setAllSupplements] = useState([]);

  useEffect(() => {
    // Получаем список категорий
    axiosInstance
      .get("categories")
      .then((response) => setCategories(response.data))
      .catch((err) => console.error("Ошибка при загрузке категорий"));

    // Получаем список добавок
    axiosInstance
      .get("supplements")
      .then((response) => setAllSupplements(response.data))
      .catch((err) => console.error("Ошибка при загрузке добавок"));
  }, []);

  const handleSupplementChange = (e, supplementId) => {
    const checked = e.target.checked;
    if (checked) {
      setSupplements([...supplements, supplementId]);
    } else {
      setSupplements(supplements.filter((id) => id !== supplementId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, price, category, supplements });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Название
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="description"
        >
          Описание
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          rows="4"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
          Цена
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="category"
        >
          Категория
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        >
          <option value="">Выберите категорию</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Добавки</label>
        <div className="space-y-2">
          {allSupplements.map((supplement) => (
            <div key={supplement._id} className="flex items-center">
              <input
                type="checkbox"
                id={`supplement-${supplement._id}`}
                onChange={(e) => handleSupplementChange(e, supplement._id)}
                checked={supplements.includes(supplement._id)}
                className="mr-2"
              />
              <label
                htmlFor={`supplement-${supplement._id}`}
                className="text-gray-700"
              >
                {supplement.name} - {supplement.price} тг
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Сохранение..." : "Сохранить"}
      </button>
    </form>
  );
};

export default ProductForm;
