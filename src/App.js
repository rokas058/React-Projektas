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
import ProductTable from "./Admin/ProductTable";
import Test from "./Admin/Test";
import ProductForm from "./Admin/ProductForm";
import EditProduct from "./Admin/EditProduct";
import EditProductForm from "./Admin/EditProductForm";


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

        <Route
          path="/admin/product/create_product"
          element={<Create_product />}
        />
        <Route path="/admin/product/ProductTable" element={<ProductTable />} />
        <Route path="/admin/test" element={<Test />} />
        <Route path="/admin/product/ProductForm" element={<ProductForm />} />
        <Route path="/admin/product/edit/:id" element={<EditProduct />} />
        <Route path="/admin/product/edit/:id" element={<EditProductForm />} />

      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;

