import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/CategoryDetails";
import AdminHome from "./admin/Home";
import AdminCategoriesList from "./admin/category/List";
import AdminCategoryPage from "./admin/category/Show";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-100 p-8">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<CategoryDetails />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/categories" element={<AdminCategoriesList />} />
            <Route path="/admin/categories/:id" element={<AdminCategoryPage />} />
            {/* <Route path="/admin/categories/edit/:id" element={<AdminCategoryEdit />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
