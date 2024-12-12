import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");

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
            <li>
              <Link to="/profile" className="hover:text-yellow-400">
                Profile
              </Link>
            </li>
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
