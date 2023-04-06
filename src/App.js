import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Paveikslai from "./pages/Paveikslai";
import Fotografija from "./pages/Fotografija";
import Skulpturos from "./pages/Skulpturos";
import Keramika from "./pages/Keramika";

import Admin from "./Admin/Admin";
import User from "./Admin/User";
import Product from "./Admin/Product";
import Create_product from "./Admin/Create_product";
import Test from "./Admin/Test";

function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paveikslai" element={<Paveikslai />} />
        <Route path="/fotografija" element={<Fotografija />} />
        <Route path="/skulpturos" element={<Skulpturos />} />
        <Route path="/keramika" element={<Keramika />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/user" element={<User />} />
        <Route path="/admin/product" element={<Product />} />
        <Route
          path="/admin/product/create_product"
          element={<Create_product />}
        />
        <Route path="/admin/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
