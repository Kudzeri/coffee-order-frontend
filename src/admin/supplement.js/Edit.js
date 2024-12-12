import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import SupplementForm from "../../components/admin/SupplementForm";
import { useParams, useNavigate } from "react-router-dom";

const AdminSupplementEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [supplement, setSupplement] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSupplement = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`supplements/${id}`);
        setSupplement(response.data.supplement);
      } catch (err) {
        setError("Ошибка при загрузке добавки");
      } finally {
        setLoading(false);
      }
    };
    fetchSupplement();
  }, [id]);

  const handleUpdate = async (data) => {
    setLoading(true);
    setError("");
    try {
      await axiosInstance.put(`supplements/${id}`, data);
      navigate("/admin/supplements");
    } catch (err) {
      setError("Ошибка при обновлении добавки");
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
      <h1 className="text-2xl font-bold mb-6">Редактирование добавки</h1>
      {supplement && (
        <SupplementForm
          initialData={supplement}
          onSubmit={handleUpdate}
          loading={loading}
        />
      )}
    </div>
  );
};

export default AdminSupplementEdit;
