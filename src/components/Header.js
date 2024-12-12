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
    <header className="bg-red-900 text-white p-4 shadow-lg">
      <nav>
        <ul className="flex justify-center space-x-8">
          <li>
            <Link to="/" className="hover:text-yellow-400">
              Home
            </Link>
          </li>
          {token ? (
            <>
              <li>
                <Link to="/profile" className="hover:text-yellow-400">
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:text-yellow-400 bg-transparent border-0 cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-yellow-400">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-yellow-400">
                  Register
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
