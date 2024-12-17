import React from 'react';

const OrderCard = ({ order, onUpdateStatus }) => {
  const handleComplete = async () => {
    try {
      await onUpdateStatus(order._id, 'completed');
    } catch (error) {
      console.error('Error updating order status', error);
    }
  };

  const handleCancel = async () => {
    try {
      await onUpdateStatus(order._id, 'cancelled');
    } catch (error) {
      console.error('Error updating order status', error);
    }
  };

  return (
    <div className="order-card border rounded-lg p-4 mb-4 bg-white shadow-md">
      <h3 className="text-xl font-semibold text-gray-800">Заказ №{order._id}</h3>
      <p className="text-gray-600">Статус: <span className="font-semibold">{order.status}</span></p>
      <p className="text-gray-600">Общая цена: <span className="font-semibold">{order.totalPrice} тнг.</span></p>
      <p className="text-gray-600">Способ оплаты: <span className="font-semibold">{order.paymentMethod}</span></p>
      
      <div className="mt-4">
  <h4 className="font-semibold text-gray-700">Товары:</h4>
  <ul className="list-disc pl-6">
    {order.products.map((item) => (
      <li key={item._id} className="text-gray-600">{item.product.name}</li> 
    ))}
  </ul>
</div>

<div className="mt-4">
  <h4 className="font-semibold text-gray-700">Добавки:</h4>
  <ul className="list-disc pl-6">
    {order.supplements.map((supplement) => (
      <li key={supplement._id} className="text-gray-600">{supplement.supplement.name}</li> 
    ))}
  </ul>
</div>

      
      <div className="mt-4">
        <button 
          onClick={handleComplete} 
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 mr-2"
        >
          Завершить
        </button>
        <button 
          onClick={handleCancel} 
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Отменить
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
