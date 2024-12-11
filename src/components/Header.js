import React from "react";

const Header = () => {
  return (
    <header className="bg-red-900 text-white p-4 shadow-lg">
      <nav>
        <ul className="flex justify-center space-x-8">
          <li>
            <a href="/" className="hover:text-yellow-400">
              Home
            </a>
          </li>
          <li>
            <a href="/login" className="hover:text-yellow-400">
              Login
            </a>
          </li>
          <li>
            <a href="/register" className="hover:text-yellow-400">
              Register
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
