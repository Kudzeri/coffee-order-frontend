import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import ProductForm from "../../components/admin/ProductForm";
import { useParams, useNavigate } from "react-router-dom";

const AdminProductEdit = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [supplements, setSupplements] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/"); 
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const fetchSupplements = async () => {
        try {
          const response = await axiosInstance.get("/supplements");
          setSupplements(response.data.supplements || []);
        } catch (err) {
          setError("Ошибка при загрузке добавок");
        }
      };

      const fetchProduct = async () => {
        try {
          const response = await axiosInstance.get(`products/${slug}`);
          setProduct(response.data.product);
        } catch (err) {
          setError("Ошибка при загрузке продукта");
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

      try {
        await Promise.all([fetchCategories(), fetchSupplements(), fetchProduct()]);
      } catch (err) {
        // You could handle the error here if needed
        setError("Ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

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
          supplements={supplements}
          onSubmit={handleUpdate}
          loading={loading}
        />
      )}
    </div>
  );
};

export default AdminProductEdit;
