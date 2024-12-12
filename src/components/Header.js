import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Для изменения состояния экрана (мобильный/десктоп) в зависимости от размера окна
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // 1024px - это граница для десктопа
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="bg-red-900 text-white p-4 shadow-lg px-4 sm:px-6 md:px-8 lg:px-16">
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          {isDesktop && (
            <div className="flex space-x-4">
              <Link to="/" className="hover:text-yellow-400 sm:text-sm font-bold">
                Coffee Samurai
              </Link>
              <Link
                to="/categories"
                className="hover:text-yellow-400 sm:text-sm"
              >
                Категории
              </Link>
              <Link
                to="/supplements"
                className="hover:text-yellow-400 sm:text-sm"
              >
                Добавки
              </Link>
            </div>
          )}

          {!isDesktop && (
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white focus:outline-none ml-4"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
        </div>

        {isDesktop && (
          <ul className="flex space-x-4 sm:space-x-8 md:space-x-12 lg:space-x-16 ml-auto">
            {token ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="hover:text-yellow-400 sm:text-sm"
                  >
                    Профиль
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-yellow-400 bg-transparent border-0 cursor-pointer sm:text-sm"
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
        )}

        {!isDesktop && (
          <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } absolute top-16 left-1/2 transform -translate-x-1/2 w-full bg-red-900 flex-col items-center justify-center`}
        >
          <li className="py-2 px-4 text-center">
            <Link to="/" className="block text-white hover:text-yellow-400 font-bold">
            Coffee Samurai
            </Link>
          </li>
          <li className="py-2 px-4 text-center">
            <Link
              to="/categories"
              className="block text-white hover:text-yellow-400"
            >
              Категории
            </Link>
          </li>
          <li className="py-2 px-4 text-center">
            <Link
              to="/supplements"
              className="block text-white hover:text-yellow-400"
            >
              Добавки
            </Link>
          </li>
          {token ? (
            <>
              <li className="py-2 px-4 text-center">
                <Link
                  to="/profile"
                  className="block text-white hover:text-yellow-400"
                >
                  Профиль
                </Link>
              </li>
              <li className="py-2 px-4 text-center">
                <div
                  onClick={handleLogout}
                  className="cursor-pointer text-white hover:text-yellow-400 bg-transparent border-0"
                >
                  Выйти
                </div>
              </li>
            </>
          ) : (
            <>
              <li className="py-2 px-4 text-center">
                <Link
                  to="/login"
                  className="block text-white hover:text-yellow-400"
                >
                  Вход
                </Link>
              </li>
              <li className="py-2 px-4 text-center">
                <Link
                  to="/register"
                  className="block text-white hover:text-yellow-400"
                >
                  Регистрация
                </Link>
              </li>
            </>
          )}
        </ul>
        
        
        
        )}
      </nav>
    </header>
  );
};

export default Header;
