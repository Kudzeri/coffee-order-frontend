import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axiosConfig";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    isAnonymous: false,
    role: "",
    userId: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("auth/me");
        const user = response.data.user;

        setProfileData({
          name: user.name || "Отсутствует",
          email: user.email || "Отсутствует",
          phone: user.phone || "Отсутствует",
          isAnonymous: user.isAnonymous || false,
          role: user.role || "",
          userId: user._id || "",
        });
      } catch (err) {
        setError("Не удалось загрузить данные профиля.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getAvatar = () => {
    if (profileData.role === "admin") {
      return "https://headicon.trovo.live/user/kxujebqaaaaaa2gbzo57cj7rcy.png?ext=jpeg&t=1";
    } else if (profileData.isAnonymous) {
      return "https://i.pinimg.com/originals/4b/d8/fc/4bd8fc279520766dc9b89c7b3694a2cf.jpg";
    } else {
      return "https://cdn.fishki.net/upload/post/2024/02/09/4580749/0d18d3c267e48b179ece0eeedfec7669.png";
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Профиль
        </h2>

        {loading && (
          <div className="text-gray-500 text-center">Загрузка...</div>
        )}

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {!loading && !error && (
          <div>
            <div className="flex justify-center mb-6">
              <img
                src={getAvatar()}
                alt="Аватар"
                className="w-24 h-24 rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="mb-4">
              <strong className="text-gray-700">Имя:</strong>
              <p className="text-gray-600">{profileData.name}</p>
            </div>
            <div className="mb-4">
              <strong className="text-gray-700">Email:</strong>
              <p className="text-gray-600">{profileData.email}</p>
            </div>
            <div className="mb-4">
              <strong className="text-gray-700">Номер телефона:</strong>
              <p className="text-gray-600">{profileData.phone}</p>
            </div>
            <div className="mb-4">
              <strong className="text-gray-700">Статус:</strong>
              <p
                className={`text-gray-600 ${
                  profileData.isAnonymous ? "text-red-500" : "text-green-500"
                }`}
              >
                {profileData.isAnonymous
                  ? "Анонимный пользователь"
                  : "Пользователь"}
              </p>
            </div>

            {profileData.role === "admin" && (
              <div className="text-center mt-6">
                <Link
                  to="/admin"
                  className="inline-block bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600"
                >
                  Перейти в админ панель
                </Link>
              </div>
            )}

            {!profileData.isAnonymous && (
              <div className="text-center mt-4">
                <Link
                  to="/profile/edit"
                  className="inline-block bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600"
                >
                  Редактировать профиль
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
