import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-12">
      <div className="container mx-auto px-6 sm:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-red-800 mb-8">
          Добро пожаловать в Coffee Samurai
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src="https://i.pinimg.com/originals/dd/40/f2/dd40f2b72bad528c2f5dbb1dd0bb33e0.jpg"
                alt="Coffee Samurai"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-1/2 ml-0 md:ml-8 text-center md:text-left">
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6">
                Добро пожаловать в Coffee Samurai — место, где соединяются
                лучшие традиции японского чаепития и кофе. Мы гордимся тем, что
                предлагаем нашим гостям исключительно качественные напитки,
                приготовленные с любовью и вниманием.
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6">
                Наша кофейня была основана в 2015 году и с тех пор мы продолжаем
                совершенствовать нашу рецептуру, уделяя внимание каждому кофе и
                каждому гостю.
              </p>

              <div className="space-y-4 mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
                  Важные года:
                </h2>
                <ul className="list-disc list-inside text-base sm:text-lg lg:text-xl text-gray-600">
                  <li>2015 — Открытие первой кофейни Coffee Samurai</li>
                  <li>
                    2017 — Запуск уникальных напитков с японскими добавками
                  </li>
                  <li>2020 — Открытие второго филиала в центре города</li>
                  <li>2023 — Внедрение собственного сорта кофе</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center md:text-left">
        <Link
          to="/menu"
          className="bg-red-800 text-white px-6 py-3 rounded-lg text-lg sm:text-xl lg:text-2xl font-semibold hover:bg-red-900 transition duration-300"
        >
          Перейти к меню
        </Link>
      </div>
    </div>
  );
};

export default Home;
