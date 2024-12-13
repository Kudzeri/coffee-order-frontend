import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosConfig";
import ProductForm from "../../components/admin/ProductForm";

const AdminProductCreate = () => {
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        const response = await axiosInstance.get("/supplements");
        setSupplements(response.data.supplements || []);
      } catch (err) {
        setError("Ошибка при загрузке добавок");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplements();
  }, []);

  const handleSubmit = (data) => {
    const productData = {
      ...data,
      supplements: data.supplements.map((supplementId) => supplementId),
    };
    console.log("Отправка данных:", productData);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Создание продукта</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <div>Загрузка...</div>
      ) : (
        <ProductForm
          initialData={{}}
          allSupplements={supplements}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </div>
  );
};

export default AdminProductCreate;
