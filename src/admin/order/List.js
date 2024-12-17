import React, { useState, useEffect } from 'react';
import OrderCard from '../../components/admin/OrderCard';
import axiosInstance from '../../axiosConfig';
import { useNavigate, Link } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      const role = localStorage.getItem("role");
      if (role !== "admin" || !role) {
        navigate("/");
      }
    }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/orders');
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await axiosInstance.put(`/orders/${orderId}`, { status });

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );

        alert("Статус успешно обновлен!")
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status', error);
    }
  };

  return (
    <div className="order-list">
        <h1 className="text-2xl font-bold">
          <Link className="text-yellow-500" to={`/admin`}>Админка</Link>/Заказы
        </h1>
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} onUpdateStatus={updateOrderStatus} />
      ))}
    </div>
  );
};

export default OrderList;
