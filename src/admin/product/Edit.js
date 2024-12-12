import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import ProductForm from "../../components/admin/ProductForm"; // Используем компонент для формы продукта
import { useParams, useNavigate } from "react-router-dom";

const AdminProductEdit = () => {
  const { id } = useParams(); // Получаем id продукта из параметров URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [allSupplements, setAllSupplements] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`products/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError("Ошибка при загрузке продукта");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("categories");
        setCategories(response.data);
      } catch (err) {
        setError("Ошибка при загрузке категорий");
      }
    };

    const fetchSupplements = async () => {
      try {
        const response = await axiosInstance.get("supplements");
        setAllSupplements(response.data);
      } catch (err) {
        setError("Ошибка при загрузке добавок");
      }
    };

    fetchProduct();
    fetchCategories();
    fetchSupplements();
  }, [id]);

  const handleUpdate = async (data) => {
    setLoading(true);
    setError("");
    try {
      await axiosInstance.put(`products/${id}`, data);
      navigate("/admin/products");
    } catch (err) {
      setError("Ошибка при обновлении продукта");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Редактирование продукта</h1>
      {product && (
        <ProductForm
          initialData={product}
          categories={categories}
          supplements={allSupplements}
          onSubmit={handleUpdate}
          loading={loading}
        />
      )}
    </div>
  );
};

export default AdminProductEdit;
