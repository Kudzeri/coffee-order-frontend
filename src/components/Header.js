import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-red-900 text-white p-4 shadow-lg px-4 sm:px-6 md:px-8 lg:px-16">
      <nav className="flex justify-between items-center">
        <ul className="flex space-x-4 sm:space-x-8 md:space-x-12 lg:space-x-16">
          <li>
            <Link to="/" className="hover:text-yellow-400">
              Главная
            </Link>
          </li>
          <li>
            <Link to="/categories" className="hover:text-yellow-400">
              Категории
            </Link>
          </li>
          <li>
            <Link to="/supplements" className="hover:text-yellow-400">
              Добавки
            </Link>
          </li>
        </ul>

        <ul className="flex space-x-4 sm:space-x-6 md:space-x-8">
          {token ? (
            <>
              <li>
                <Link to="/profile" className="hover:text-yellow-400">
                  Профиль
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-yellow-400 bg-transparent border-0 cursor-pointer"
                >
                  Выйти
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-yellow-400">
                  Вход
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-yellow-400">
                  Регистрация
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
