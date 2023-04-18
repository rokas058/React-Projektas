import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import AdminNavigationBar from "./Admin/AdminNavigationBar";
import Home from "./pages/Home";
import Paveikslai from "./pages/Paveikslai";
import Fotografija from "./pages/Fotografija";
import Skulpturos from "./pages/Skulpturos";
import Keramika from "./pages/Keramika";
import Paveikslas from "./pages/Paveikslas";
import Footer from "./components/Footer";

import Admin from "./Admin/Admin";
import User from "./Admin/User";
import Product from "./Admin/Product";
// import ProductTable from "./Admin/ProductTable";
import Purchase from "./Admin/Purchase";
import ProductForm from "./Admin/ProductForm";
import EditProduct from "./Admin/EditProduct";
import EditProductForm from "./Admin/EditProductForm";

import UserEdit from "./Admin/UserEdit";
import UserEditForm from "./Admin/UserEditForm";

import Paskyra from "./AccountUser/Paskyra";
import PasswordChange from "./AccountUser/PasswordChange";

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div>
      {isAdmin ? <AdminNavigationBar /> : <NavigationBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paveikslai" element={<Paveikslai />} />
        <Route path="/fotografija" element={<Fotografija />} />
        <Route path="/skulpturos" element={<Skulpturos />} />
        <Route path="/keramika" element={<Keramika />} />
        <Route exact path="/:id" element={<Paveikslas />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/user" element={<User />} />
        <Route path="/admin/product" element={<Product />} />

        {/* <Route path="/admin/product/ProductTable" element={<ProductTable />} /> */}
        <Route path="/admin/purchase" element={<Purchase />} />
        <Route path="/admin/product/ProductForm" element={<ProductForm />} />
        <Route path="/admin/product/edit/:id" element={<EditProduct />} />
        <Route path="/admin/product/edit/:id" element={<EditProductForm />} />

        <Route path="/admin/user/edit/:id" element={<UserEdit />} />
        <Route path="/admin/user/edit/:id" element={<UserEditForm />} />

        <Route path="/paskyra" element={<Paskyra />} />
        <Route path="/password-change" element={<PasswordChange />} />
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
