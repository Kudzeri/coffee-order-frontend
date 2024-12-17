import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig"; // Импортируем ваш axios экземпляр

const Cart = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    // Получаем заказы с API
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/api/orders");
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    
    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Корзина</h2>
      {orders.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="border p-4 mb-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">Заказ № {order._id}</h3>
              <span className={`text-sm font-semibold ${order.status === "completed" ? "text-green-500" : "text-yellow-500"}`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-2">
              <div>
                <h4 className="font-semibold">Продукты:</h4>
                <ul className="list-disc pl-5">
                  {order.products.map((item) => (
                    <li key={item.product} className="flex justify-between">
                      <span>Продукт: {item.product}</span>
                      <span>Количество: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Добавки:</h4>
                <ul className="list-disc pl-5">
                  {order.supplements.map((item) => (
                    <li key={item.supplement} className="flex justify-between">
                      <span>Добавка: {item.supplement}</span>
                      <span>Количество: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-semibold">Метод оплаты: {order.paymentMethod}</span>
                <span className="text-lg font-semibold">Общая сумма: ${order.totalPrice}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
