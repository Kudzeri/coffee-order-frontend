import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const carouselItems = [
    {
      id: 1,
      image:
        "https://s.kaskus.id/images/2016/08/01/5104476_20160801113624.jpg",
      title: "Лучшие сорта кофе",
      description: "Попробуйте наш фирменный кофе.",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/736x/8d/d4/0f/8dd40fe03f4d94f1b3ea7708d55b0959.jpg",
      title: "Японские традиции",
      description: "Кофе и чай, вдохновленные Японией.",
    },
    {
      id: 3,
      image:
        "https://i.pinimg.com/originals/60/fc/38/60fc3874be43ca96d718c01028fb2194.jpg",
      title: "Уютная атмосфера",
      description: "Приятные встречи с друзьями.",
    },
  ];

  const CustomPrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-red-700 text-white p-2 rounded-full shadow-lg hover:bg-red-800"
    >
      &#8592;
    </button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-red-700 text-white p-2 rounded-full shadow-lg hover:bg-red-800"
    >
      &#8594;
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-12">
      <div className="container mx-auto px-6 sm:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-red-800 mb-8">
          Добро пожаловать в Coffee Samurai
        </h1>

        <div className="relative mb-8">
          <Slider {...settings}>
            {carouselItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full max-h-80 object-cover rounded-lg shadow-md mb-4"
                />
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 text-center">
                  {item.title}
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 text-center">
                  {item.description}
                </p>
              </div>
            ))}
          </Slider>
        </div>

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
