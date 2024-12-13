import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";

const ProductForm = ({
  initialData = {},
  onSubmit,
  loading,
  allSupplements = [],
}) => {
  const [name, setName] = useState(initialData.name || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [price, setPrice] = useState(initialData.price || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [supplements, setSupplements] = useState(initialData.supplements || []);
  const [categories, setCategories] = useState([]);
  const [slug, setSlug] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredSupplements, setFilteredSupplements] =
    useState(allSupplements);
  const [imageUrl, setImageUrl] = useState(initialData.image || "");
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("categories")
      .then((response) => setCategories(response.data.categories || []))
      .catch((err) => console.error("Ошибка при загрузке категорий"));
  }, []);

  useEffect(() => {
    if (name) {
      const generatedSlug = slugify(name, {
        lower: true,
        remove: /[^\w\s-]/g,
        replace: {
          и: "i",
        },
      });
      setSlug(generatedSlug);
    }
  }, [name]);

  useEffect(() => {
    setFilteredSupplements(
      allSupplements.filter((supplement) =>
        supplement.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, allSupplements]);

  const handleSupplementChange = (e, supplementId) => {
    const checked = e.target.checked;
    if (checked) {
      setSupplements([...supplements, supplementId]);
    } else {
      setSupplements(supplements.filter((id) => id !== supplementId));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axiosInstance.post("/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const imageUrl = `http://localhost:4444${response.data.imageUrl}`;
        setImageUrl(imageUrl);
        setImageFile(file);
      } catch (error) {
        console.error("Ошибка загрузки изображения:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    const image = imageUrl;
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/products", {
        name,
        slug,
        description,
        price,
        category,
        supplements,
        image,
      });
      navigate(`/admin/products/${slug}`);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
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
        <label className="block text-gray-700 font-bold mb-2" htmlFor="slug">
          Slug (автоматически генерируется)
        </label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          readOnly
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
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))
          ) : (
            <option disabled>Нет доступных категорий</option>
          )}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Добавки (поиск и множественный выбор)
        </label>
        <input
          type="text"
          placeholder="Поиск добавок..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
        />
        <div className="relative">
          <select
            multiple
            id="supplements"
            value={supplements}
            onChange={(e) => {
              const selectedSupplements = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              setSupplements(selectedSupplements);
            }}
            className="w-full px-4 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.isArray(filteredSupplements) &&
            filteredSupplements.length > 0 ? (
              filteredSupplements.map((supplement) => (
                <option
                  key={supplement._id}
                  value={supplement._id}
                  className="p-2"
                >
                  {supplement.name}
                </option>
              ))
            ) : (
              <option disabled>Нет добавок для отображения</option>
            )}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="imageUrl"
        >
          Изображение
        </label>
        <div className="flex flex-col">
          <input
            type="file"
            onChange={handleImageUpload}
            className="mb-2"
            accept="image/*"
          />
          {imageUrl && (
            <div className="text-green-500">
              Изображение загружено:{" "}
              <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                {imageUrl}
              </a>
            </div>
          )}
          <input
            type="text"
            placeholder="Или вставьте ссылку на изображение"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded mt-2"
          />
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
