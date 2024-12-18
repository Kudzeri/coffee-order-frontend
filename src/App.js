import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import CategoryDetails from "./pages/CategoryDetails";
import Supplements from "./pages/Supplements";
import SupplementDetails from "./pages/SupplementDetails";
import ProductDetails from "./pages/ProductDetails";
import AdminHome from "./admin/Home";
import AdminCategoriesList from "./admin/category/List";
import AdminCategoryPage from "./admin/category/Show";
import AdminCategoryEdit from "./admin/category/Edit";
import AdminCategoryCreate from "./admin/category/Create";
import AdminSupplementsList from "./admin/supplement/List";
import AdminSupplementPage from "./admin/supplement/Show";
import AdminSupplementEdit from "./admin/supplement/Edit";
import AdminSupplementCreate from "./admin/supplement/Create";
import AdminProductsList from "./admin/product/List";
import AdminProductPage from "./admin/product/Show";
import AdminProductEdit from "./admin/product/Edit";
import AdminProductCreate from "./admin/product/Create";
import Home from "./pages/Home";
import EditProfile from './pages/EditProfile'
import Cart from "./pages/Cart";
import AdminOrderList from "./admin/order/List";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-100 p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:id" element={<CategoryDetails />} />
            <Route path="/supplements" element={<Supplements />} />
            <Route path="/supplements/:id" element={<SupplementDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/categories" element={<AdminCategoriesList />} />
            <Route
              path="/admin/categories/:id"
              element={<AdminCategoryPage />}
            />
            <Route
              path="/admin/categories/edit/:id"
              element={<AdminCategoryEdit />}
            />
            <Route
              path="/admin/categories/new"
              element={<AdminCategoryCreate />}
            />
            <Route
              path="/admin/supplements"
              element={<AdminSupplementsList />}
            />
            <Route
              path="/admin/supplements/:id"
              element={<AdminSupplementPage />}
            />
            <Route
              path="/admin/supplements/edit/:id"
              element={<AdminSupplementEdit />}
            />
            <Route
              path="/admin/supplements/new"
              element={<AdminSupplementCreate />}
            />
            <Route path="/admin/products" element={<AdminProductsList />} />
            <Route path="/admin/products/:slug" element={<AdminProductPage />} />
            <Route
              path="/admin/products/edit/:slug"
              element={<AdminProductEdit />}
            />
            <Route
              path="/admin/orders"
              element={<AdminOrderList />}
            />
            <Route
              path="/admin/products/new"
              element={<AdminProductCreate />}
            />
            <Route 
            path="/profile/edit"
            element={ <EditProfile />}
            />
            <Route 
            path="/cart"
            element={ <Cart />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
