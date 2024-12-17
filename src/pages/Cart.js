import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const CheckoutButton = ({ cart }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axiosInstance.get('/auth/me');
          setUser(response.data.user);
        } catch (error) {
          console.error("Ошибка при получении данных пользователя", error);
        }
      };

      fetchUserData();
    }, []);

    const handleOrder = async () => {
      if (!user) {
        alert("Не удалось получить данные пользователя.");
        return;
      }

      const orderData = {
        user: user._id, 
        products: cart.products.map(item => ({
          product: item.product, 
          quantity: item.quantity 
        })),
        supplements: cart.supplements.map(item => ({
          supplement: item.supplement, 
          quantity: item.quantity     
        })),
        totalPrice: cart.totalPrice, 
        status: "pending",           
        paymentMethod: "card"        
      };

      try {
        const response = await axiosInstance.post('/orders', orderData);

        if (response.status === 201) {
          alert("Заказ успешно создан!");
        }
      } catch (error) {
        console.error("Ошибка при создании заказа:", error);
        alert("Не удалось создать заказ.");
      }
    };

    return <button 
    onClick={handleOrder} 
    className="bg-green-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300 shadow-lg transform hover:scale-105"
  >
    Оформить заказ
  </button>
  ;
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('user_cart'));

    if (storedCart) {
      setCart(storedCart);
      calculateTotalPrice(storedCart);
    } else {
      setCart({ products: [], supplements: [], totalPrice: 0 });
    }
  }, []);

  const calculateTotalPrice = (cart) => {
    const productTotal = cart.products.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const supplementTotal = cart.supplements.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    setTotalPrice(productTotal + supplementTotal);
  };

  const handleRemoveProduct = (productId) => {
    const updatedCart = { ...cart };
    updatedCart.products = updatedCart.products.filter(
      (product) => product.product !== productId
    );
    updateCartInLocalStorage(updatedCart);
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const handleRemoveSupplement = (supplementId) => {
    const updatedCart = { ...cart };
    updatedCart.supplements = updatedCart.supplements.filter(
      (supplement) => supplement.supplement !== supplementId
    );
    updateCartInLocalStorage(updatedCart);
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem('user_cart', JSON.stringify(updatedCart));
  };

  if (!cart) {
    return <div>Загрузка...</div>;
  }

  if (cart.products.length === 0 && cart.supplements.length === 0) {
    return <div>Ваша корзина пуста</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Корзина</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Товары:</h2>
        <ul className="space-y-4">
          {cart.products.map((product) => (
            <li key={product.product} className="flex justify-between items-center">
              <span className="text-lg">{product.name} x {product.quantity}</span>
              <button
                onClick={() => handleRemoveProduct(product.product)}
                className="text-red-600 hover:text-red-800"
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Добавки:</h2>
        <ul className="space-y-4">
          {cart.supplements.map((supplement) => (
            <li key={supplement.supplement} className="flex justify-between items-center">
              <span className="text-lg">{supplement.name} x {supplement.quantity}</span>
              <button
                onClick={() => handleRemoveSupplement(supplement.supplement)}
                className="text-red-600 hover:text-red-800"
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-right">
          <p className="text-xl font-semibold">Итого: {cart.totalPrice} тг.</p>
        </div>
      </div>
      <CheckoutButton cart={cart} />
    </div>
  );
};

export default CartPage;
