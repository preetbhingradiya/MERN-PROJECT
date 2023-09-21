import React from "react";
import "./App.css";
import Header from "./component/layout/header/Header.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import webfont from "webfontloader";
import Footer from "./component/layout/footer/Footer";
import Home from "./component/Home/Home.jsx";
import ProductDetailes from './component/Product/ProductDetailes.jsx'
import Products from './component/Product/Products.jsx'
import Search from './component/Product/Search.jsx'
import LoginSign from "./component/User/LoginSign";

function App() {
  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route extact path="/" Component={Home} />
        <Route extact path="/product/:id" Component={ProductDetailes} />
        <Route extact path="/products" Component={Products} />
        <Route path="/products/:name" Component={Products} />
        <Route extact path="/search" Component={Search} />
        <Route extact path="/login" Component={LoginSign} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
