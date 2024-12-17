import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosConfig";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [profileMessage, setProfileMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        const { user } = response.data;

        setProfileData({
          name: user.name || "",
          email: user.email || "",
          phone: user.phone || "", 
        });
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put("/auth/edit-profile", profileData);
      setProfileMessage(response.data.message || "Данные профиля обновлены.");
    } catch (error) {
      setProfileMessage(
        error.response?.data?.message || "Ошибка при обновлении профиля."
      );
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put("/auth/edit-password", passwordData);
      setPasswordMessage(response.data.message || "Пароль успешно изменён.");
    } catch (error) {
      setPasswordMessage(
        error.response?.data?.message || "Ошибка при смене пароля."
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Редактировать профиль</h2>
        {profileMessage && (
          <p className={`mb-4 ${profileMessage.includes("Ошибка") ? "text-red-500" : "text-green-500"}`}>
            {profileMessage}
          </p>
        )}
        <form onSubmit={updateProfile}>
          <div className="mb-4">
            <label className="block text-gray-700">Имя</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleProfileChange}
              className="w-full mt-2 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleProfileChange}
              className="w-full mt-2 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Телефон</label>
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleProfileChange}
              className="w-full mt-2 p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Обновить
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Сменить пароль</h2>
        {passwordMessage && (
          <p className={`mb-4 ${passwordMessage.includes("Ошибка") ? "text-red-500" : "text-green-500"}`}>
            {passwordMessage}
          </p>
        )}
        <form onSubmit={changePassword}>
          <div className="mb-4">
            <label className="block text-gray-700">Текущий пароль</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full mt-2 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Новый пароль</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full mt-2 p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Изменить пароль
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
