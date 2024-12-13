import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig"; 

const OrdersHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Используем userId для загрузки заказов конкретного пользователя, если он передан
        const response = await axiosInstance.get(`/orders?userId=${userId}`); 
        setOrders(response.data.orders);
      } catch (err) {
        setError("Не удалось загрузить заказы.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    } else {
      setError("Не передан userId.");
      setLoading(false);
    }
  }, [userId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        История заказов
      </h2>

      {loading && (
        <div className="text-gray-500 text-center">Загрузка...</div>
      )}

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {!loading && !error && orders.length === 0 && (
        <div className="text-gray-500 text-center">Нет заказов.</div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="mb-4 border-b">
              <div className="mb-2">
                <strong className="text-gray-700">Дата заказа:</strong>
                <p className="text-gray-600">{new Date(order.orderDate).toLocaleString()}</p>
              </div>
              <div className="mb-2">
                <strong className="text-gray-700">Итоговая сумма:</strong>
                <p className="text-gray-600">{order.totalAmount} ₽</p>
              </div>
              <div className="mb-2">
                <strong className="text-gray-700">Продукты:</strong>
                <ul className="text-gray-600">
                  {order.products.map((product, index) => (
                    <li key={index}>
                      {product.productId} - Количество: {product.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <strong className="text-gray-700">Добавки:</strong>
                <ul className="text-gray-600">
                  {order.supplements.map((supplement, index) => (
                    <li key={index}>{supplement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersHistory;
