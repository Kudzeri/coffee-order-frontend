import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    isAnonymous: false,
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
        });
      } catch (err) {
        setError("Не удалось загрузить данные профиля.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Отображаем данные
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
